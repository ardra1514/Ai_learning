// controllers/documentController.js

import fs from "fs/promises";
import mongoose from "mongoose";

import Document from "../models/Document.js";

import { extractTextFromPDF } from "../utils/pdfParser.js";
import { chunkText } from "../utils/textChunker.js";
import Flashcard from "../models/FlashCard.js";
import Quiz from "../models/Quiz.js";


// upload document
export const uploadDocument = async (
    req,
    res,
    next
) => {

    try {

        // check uploaded file
        if (!req.file) {

            return res.status(400).json({
                success: false,
                error: "Please upload a file"
            });
        }

        // get title
        const { title } = req.body;

        // validate title
        if (!title) {

            // delete uploaded file
            await fs.unlink(req.file.path);

            return res.status(400).json({
                success: false,
                error:
                    "Please provide a document title"
            });
        }

        // create file url
        const baseUrl =
            `http://localhost:${process.env.PORT || 8000}`;

        const fileUrl =
            `${baseUrl}/uploads/documents/${req.file.filename}`;

        // create document
        const document =
            await Document.create({

                userId: req.user._id,

                title,

                fileName:
                    req.file.originalname,

                filePath: fileUrl,

                fileSize:
                    req.file.size,

                status: "processing"
            });

        // process pdf in background
        processPDF(
            document._id,
            req.file.path
        ).catch(error => {

            console.error(
                "PDF processing error",
                error
            );
        });

        // response
        res.status(201).json({

            success: true,

            data: document,

            message:
                "Document uploaded successfully. Processing in progress..."
        });

    } catch (error) {

        // cleanup uploaded file
        if (req.file) {

            await fs
                .unlink(req.file.path)
                .catch(() => { });
        }

        next(error);
    }
};


// helper function to process pdf
const processPDF = async (
    documentId,
    filePath
) => {

    try {

        // extract text from pdf
        const { text } =
            await extractTextFromPDF(filePath);

        // create chunks
        const chunks =
            chunkText(text, 500, 50);

        // update document
        await Document.findByIdAndUpdate(
            documentId,
            {
                extractedText: text,

                chunks: chunks,

                status: "ready"
            }
        );

        console.log(
            `Document ${documentId} processed successfully`
        );

    } catch (error) {

        console.log(
            `Error processing ${documentId}`,
            error
        );

        // mark document failed
        await Document.findByIdAndUpdate(
            documentId,
            {
                status: "failed"
            }
        );
    }
};


// get all documents
export const getDocuments = async (
    req,
    res,
    next
) => {

    try {

        const documents =
            await Document.aggregate([

                // match current user documents
                {
                    $match: {
                        userId:
                            new mongoose.Types.ObjectId(
                                req.user._id
                            )
                    }
                },

                // lookup flashcards
                {
                    $lookup: {

                        from: "flashcards",

                        localField: "_id",

                        foreignField:
                            "documentId",

                        as: "flashcardsets"
                    }
                },

                // lookup quizzes
                {
                    $lookup: {

                        from: "quizzes",

                        localField: "_id",

                        foreignField:
                            "documentId",

                        as: "quizzes"
                    }
                },

                // add counts
                {
                    $addFields: {

                        flashcardCount: {
                            $size:
                                "$flashcardsets"
                        },

                        quizCount: {
                            $size: "$quizzes"
                        }
                    }
                },

                // remove unnecessary fields
                {
                    $project: {

                        extractedText: 0,

                        chunks: 0,

                        flashcardsets: 0,

                        quizzes: 0
                    }
                },

                // latest first
                {
                    $sort: {
                        uploadDate: -1
                    }
                }
            ]);

        res.status(200).json({

            success: true,

            count: documents.length,

            data: documents
        });

    } catch (error) {

        next(error);
    }
};


//
export const getDocument = async (req, res, next) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
        statusCode: 404,
      });
    }

    const flashcardCount = await Flashcard.countDocuments({
      documentId: document._id,
      userId: req.user._id,
    });

    const quizCount = await Quiz.countDocuments({
      documentId: document._id,
      userId: req.user._id,
    });

    // Update last accessed time
    document.lastAccessed = new Date();
    await document.save();

    // Convert document to object
    const documentData = document.toObject();

    // Add counts
    documentData.flashcardCount = flashcardCount;
    documentData.quizCount = quizCount;

    res.status(200).json({
      success: true,
      data: documentData,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDocument = async (req,res,next) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if(!document){
            return res.status(404).json({
                success:false,
                error:'document not found'
            })
        }

        await fs.unlink(document.filePath)

        await document.deleteOne();
        res.status(200).json({
            success:true,
            message:'document deleted successfully'
        })
        
    } catch (error) {
       next(error) 
    }
}