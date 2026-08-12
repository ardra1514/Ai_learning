import ChatHistory from '../models/ChatHostory.js';
import Document from '../models/Document.js';
import Flashcard from '../models/FlashCard.js';
import Quiz from '../models/Quiz.js';
import { findRelevantChunks } from '../utils/textChunker.js';
import * as geminiService from '../utils/geminiService.js';

export const generateFlashcards = async (req,res,next ) => {
    try {

        const { documentId, count = 10 } = req.body;

        if (!documentId) {

            return res.status(400).json({
                success: false,
                error: 'Please provide documentId',
                statusCode: 400
            });
        }

        const document = await Document.findOne({
            _id: documentId,
            userId: req.user._id,
            status: 'ready'
        });

        if (!document) {

            return res.status(404).json({
                success: false,
                error: 'Document not found or not ready',
                statusCode: 404
            });
        }

        // Generate flashcards using Gemini
        const cards = await geminiService.generateFlashcards(
            document.extractedText,
            parseInt(count)
        );

        // Save to database
        const flashcardSet = await Flashcard.create({
            userId: req.user._id,
            documentId: document._id,
            cards: cards.map(card => ({
                question: card.question,
                answer: card.answer,
                difficulty: card.difficulty,
                reviewCount: 0,
                isStarred: false
            }))
        });

        res.status(201).json({
            success:true,
            data:flashcardSet,
            message:'flashcards generated successfully'
        })

    } catch (error) {
        next(error)
    }
}



export const generateQuiz = async (req,res,next ) => {
    try {

        const { documentId, numQuestions = 5, title } = req.body;

        if (!documentId) {

            return res.status(400).json({
                success: false,
                error: 'Please provide documentId',
                statusCode: 400
            });
        }

        const document = await Document.findOne({
            _id: documentId,
            userId: req.user._id,
            status: 'ready'
        });

        if (!document) {

            return res.status(404).json({
                success: false,
                error: 'Document not found or not ready',
                statusCode: 404
            });
        }

        // Generate quiz using Gemini
        const questions = await geminiService.generateQuiz(
            document.extractedText,
            parseInt(numQuestions)
        );

        // Save to database
        const quiz = await Quiz.create({
            userId: req.user._id,
            documentId: document._id,
            title: title || `${document.title} - Quiz`,
            questions: questions,
            totalQuestions: questions.length,
            userAnswers: [],
            score: 0
        })

        res.status(201).json({
            success:true,
            data:quiz,
            message:'quiz generated successfully'
        })

    } catch (error) {
        next(error)
    }
}


export const generateSummary = async (req,res,next ) => {
    try {

        const { documentId } = req.body;

        if (!documentId) {

            return res.status(400).json({
                success: false,
                error: 'Please provide documentId',
                statusCode: 400
            });
        }

        const document = await Document.findOne({
            _id: documentId,
            userId: req.user._id,
            status: 'ready'
        });

        if (!document) {

            return res.status(404).json({
                success: false,
                error: 'Document not found or not ready',
                statusCode: 404
            });
        }


        // Generate summary using Gemini
        const summary = await geminiService.generateSummary(document.extractedText);

        res.status(200).json({
            success: true,
            data: {
                documentId: document._id,
                title: document.title,
                summary
            },
            message: 'Summary generated successfully'
        });

    } catch (error) {
        next(error)
    }
}


//////////////////////////////////////////////

export const chat = async (req, res, next) => {
  try {
    console.log("===== CHAT START =====");
    console.log("Body:", req.body);

    const { documentId, question } = req.body;

    const document = await Document.findOne({
      _id: documentId,
      userId: req.user._id,
      status: "ready",
    });

    console.log("Document:", document ? "FOUND" : "NOT FOUND");

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
      });
    }

    console.log("Chunks:", document.chunks?.length);

    const relevantChunks = findRelevantChunks(
      document.chunks || [],
      question,
      3
    );

    console.log("Relevant Chunks:", relevantChunks.length);

    let chatHistory = await ChatHistory.findOne({
      userId: req.user._id,
      documentId: document._id,
    });

    console.log("History:", chatHistory ? "FOUND" : "NEW");

    if (!chatHistory) {
      chatHistory = await ChatHistory.create({
        userId: req.user._id,
        documentId: document._id,
        messages: [],
      });
    }

    console.log("Calling Gemini...");

    const answer = await geminiService.chatWithContext(
      question,
      relevantChunks
    );

    console.log("Gemini Response:", answer);

    chatHistory.messages.push(
      {
        role: "user",
        content: question,
        timestamp: new Date(),
      },
      {
        role: "assistant",
        content: answer,
        timestamp: new Date(),
      }
    );

    await chatHistory.save();

    return res.status(200).json({
      success: true,
      data: {
        answer,
        relevantChunks,
      },
    });
  } catch (error) {
    console.error("===== CHAT ERROR =====");
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

/////////////////////////////////////////////

export const explainConcept = async (req,res,next ) => {
    try {

        const { documentId, concept } = req.body;

        if (!documentId || !concept) {

            return res.status(400).json({
                success: false,
                error: 'Please provide documentId and concept',
                statusCode: 400
            });
        }

        const document = await Document.findOne({
            _id: documentId,
            userId: req.user._id,
            status: 'ready'
        });

        if (!document) {

            return res.status(404).json({
                success: false,
                error: 'Document not found or not ready',
                statusCode: 404
            });
        }

        const relevantChunks = findRelevantChunks(document.chunks, concept, 3);

        const context = relevantChunks.map(c => c.content).join('\n\n');

        const explanation = await geminiService.explainConcept(concept,context);

        res.status(200).json({
            success: true,
            data:{
                concept,
                explanation,
                relevantChunks:relevantChunks.map(c => c.chunkIndex),

            },
            message : 'response generated successfully'
        })

    } catch (error) {
        next(error)
    }
}


export const getChatHistory = async (req, res, next) => {
  try {
    const { documentId } = req.params;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        error: "Please provide documentId",
        statusCode: 400,
      });
    }

    const chatHistory = await ChatHistory.findOne({
      userId: req.user._id,
      documentId,
    }).select("messages");

    if (!chatHistory) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No chat history found",
      });
    }

    return res.status(200).json({
      success: true,
      data: chatHistory.messages,
      message: "Chat history retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};