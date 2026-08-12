import React, { useEffect, useState } from 'react'
import Button from '../../components/common/Button';
import toast from "react-hot-toast";
import { FileText, Plus } from "lucide-react";
import documentService from '../../services/documentServices';
import Spinner from '../../components/common/Spinner';
import DocumentCards from '../../components/doccuments/DocumentCards';
 import { Upload, X } from "lucide-react";
const DocumentListPage = () => {

  const [documents, setDocuments] = useState([]);
const [loading, setLoading] = useState(true);

// State for upload modal
const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
const [uploadFile, setUploadFile] = useState(null);
const [uploadTitle, setUploadTitle] = useState("");
const [uploading, setUploading] = useState(false);

// State for delete confirmation modal
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [deleting, setDeleting] = useState(false);
const [selectedDoc, setSelectedDoc] = useState(null);

const fetchDocuments = async () => {
  try {
    const data = await documentService.getDocuments();
    setDocuments(data);
  } catch (error) {
    toast.error("Failed to fetch documents.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchDocuments();
}, []);

const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setUploadFile(file);
    setUploadTitle(
      file.name.replace(/\.[^/.]+$/, "")
    );
  }
};

const handleUpload = async (e) => {
  e.preventDefault();

  if (!uploadFile || !uploadTitle) {
    toast.error("Please provide a title and select a file.");
    return;
  }

  setUploading(true);

  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("title", uploadTitle);

  try {
    await documentService.uploadDocument(formData);

    toast.success("Document uploaded successfully!");

    setIsUploadModalOpen(false);
    setUploadFile(null);
    setUploadTitle("");

    setLoading(true);
    fetchDocuments();
  } catch (error) {
    toast.error("Failed to upload document.");
    console.error(error);
  } finally {
    setUploading(false);
    setLoading(false);
  }
};

const handleDeleteRequest = (doc) => {
  setSelectedDoc(doc);
  setIsDeleteModalOpen(true);
};

const handleConfirmDelete = async () => {
  if (!selectedDoc) return;

  setDeleting(true);

  try {
    await documentService.deleteDocument(selectedDoc._id);

    toast.success(`"${selectedDoc.title}" deleted.`);

    setIsDeleteModalOpen(false);
    setSelectedDoc(null);

    setDocuments(
      documents.filter(
        (d) => d._id !== selectedDoc._id
      )
    );
  } catch (error) {
    toast.error(
      error.message || "Failed to delete document."
    );
  } finally {
    setDeleting(false);
  }
};
  const renderContent = () => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (documents.length === 0) {
   
  

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md">

        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 shadow-lg shadow-slate-200/50 mb-6">
          <FileText
            className="w-10 h-10 text-slate-400"
            strokeWidth={1.5}
          />
        </div>

        <h3 className="text-xl font-medium text-slate-900 tracking-tight mb-2">
          No Documents Yet
        </h3>

        <p className="text-sm text-slate-500 mb-6">
          Get started by uploading your first PDF document to begin learning.
        </p>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium shadow-lg"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Upload Document
        </button>

      </div>
    </div>
  );
}

 return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {documents?.map((doc) => (
          <DocumentCards
            key={doc._id}
            document={doc}
            onDelete={handleDeleteRequest}
          />
        ))}
      </div>
    );


};
  
 return (
  <div className="min-h-screen">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-medium text-slate-900 tracking-tight mb-2">
            My Documents
          </h1>

          <p className="text-slate-500 text-sm">
            Manage and organize your learning materials
          </p>
        </div>

        <Button
          onClick={() => setIsUploadModalOpen(true)}
        >
          <Plus size={18} strokeWidth={2.5} />
          Upload Document
        </Button>
      </div>

      {renderContent()}
    </div>
   

{isUploadModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

    {/* Modal */}
    <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6">

      {/* Close Button */}
      <button
        onClick={() => setIsUploadModalOpen(false)}
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
      >
        <X className="w-5 h-5" strokeWidth={2} />
      </button>

      {/* Modal Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--secondary-dark)] mb-2">
          Upload New Document
        </h2>

        <p className="text-sm text-slate-500">
          Add a PDF document to your learning library
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleUpload} className="space-y-5">

        {/* Title Input */}
        <div>
          <label className="block text-sm font-semibold text-[var(--secondary-dark)] mb-2">
            Document Title
          </label>

          <input
            type="text"
            value={uploadTitle}
            onChange={(e) => setUploadTitle(e.target.value)}
            required
            placeholder="e.g., React Interview Prep"
            className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-slate-200
              focus:outline-none
              focus:ring-2
              focus:ring-[var(--teal)]
              focus:border-transparent
              transition-all
            "
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-semibold text-[var(--secondary-dark)] mb-2">
            PDF File
          </label>

          <label
            htmlFor="file-upload"
            className="
              flex
              flex-col
              items-center
              justify-center
              p-8
              border-2
              border-dashed
              border-slate-300
              rounded-2xl
              cursor-pointer
              hover:border-[var(--teal)]
              hover:bg-slate-50
              transition-all
            "
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf"
            />

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-br
              from-[var(--teal-dark)]
              to-[var(--teal)]
              flex
              items-center
              justify-center
              mb-4
              shadow-lg
            ">
              <Upload
                className="w-8 h-8 text-white"
                strokeWidth={2}
              />
            </div>

            <p className="text-center text-sm text-slate-600">
              {uploadFile ? (
                <span className="font-semibold text-[var(--secondary-dark)]">
                  {uploadFile.name}
                </span>
              ) : (
                <>
                  <span className="font-semibold text-[var(--teal)]">
                    Click to upload
                  </span>
                  {" "}or drag and drop
                </>
              )}
            </p>

            <p className="text-xs text-slate-400 mt-2">
              PDF up to 10MB
            </p>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">

          <button
            type="button"
            onClick={() => setIsUploadModalOpen(false)}
            disabled={uploading}
            className="
              px-5
              py-2.5
              rounded-xl
              border
              border-slate-200
              text-slate-600
              hover:bg-slate-50
              transition-all
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={uploading}
            className="
              px-5
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-[var(--teal-dark)]
              to-[var(--teal)]
              text-white
              font-semibold
              shadow-lg
              hover:scale-[1.02]
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <div className="
                  w-4
                  h-4
                  border-2
                  border-white/30
                  border-t-white
                  rounded-full
                  animate-spin
                " />
                Uploading...
              </span>
            ) : (
              "Upload"
            )}
          </button>

        </div>
      </form>
    </div>
  </div>
)}
  </div>
);

}

export default DocumentListPage