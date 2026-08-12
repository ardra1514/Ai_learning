import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";
import { ArrowLeft, ExternalLink } from "lucide-react";
import documentService from "../../services/documentServices";
import Tabs from "../../components/common/Tabs";
import PageHeader from "../../components/common/PageHeader";
import ChatInterface from "../../components/chat/ChatInterface";
import AIActions from "../../components/ai/AIActions";
import FlashcardManager from "../../components/flashcards/FlashcardManager";
import QuizManager from "../../components/quiz/QuizManager";

const DocumentDetailPage = () => {
  const { id } = useParams();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        const data = await documentService.getDocumentById(id);
        console.log("API Response:", data);
        setDocument(data);
        console.log("Document State:", data);
      } catch (error) {
        toast.error("Failed to fetch document details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentDetails();
  }, [id]);

  // Helper function to get the full PDF URL
  const getPdfUrl = () => {
    if (!document?.data?.filePath) return null;

    const filePath = document.data.filePath;

    if (
      filePath.startsWith("http://") ||
      filePath.startsWith("https://")
    ) {
      return filePath;
    }

    const baseUrl =
      process.env.REACT_APP_API_URL || "http://localhost:8000";

    return `${baseUrl}${
      filePath.startsWith("/") ? "" : "/"
    }${filePath}`;
  };

  const renderContent = () => {
    if (loading) {
      return <Spinner />;
    }

    if (!document || !document.data || !document.data.filePath) {
      return <div className="text-center p-8">PDF not available.</div>;
    }

    const pdfUrl = getPdfUrl();

    return (
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-300">
          <span className="text-sm font-medium text-gray-700">
            Document Viewer
          </span>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex item-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <ExternalLink size={16} />
            Open in new tab
          </a>
        </div>

        <div className="bg-gray-100 pl">
          <iframe
            src={pdfUrl}
            className="w-full h-[calc(100vh-250px)] bg-white rounded border border-gray-300 "
            title="PDF Viewer"
            frameBorder="0"
            style={{
              colorScheme: "light",
            }}
          />
        </div>
      </div>
    );
  };

  const renderChat = () => {
     return <ChatInterface />
  };


  const renderAIActions = () => {
  return <AIActions/>
};

const renderFlashcardsTab = () => {
  if (!document?.data) return <Spinner />;

  return (
    <FlashcardManager
      documentId={document.data._id}
    />
  );
};

const renderQuizzesTab = () => {
  if (!document?.data) return <Spinner />;

  return (
    <QuizManager
      documentId={document.data._id}
    />
  );
};









  const tabs = [
  {
    name: "Content",
    label: "Content",
    content: renderContent(),
  },
  {
    name: "Chat",
    label: "Chat",
    content: renderChat(),
  },
  {
    name: "AI Actions",
    label: "AI Actions",
    content: renderAIActions(),
  },
  {
    name: "Flashcards",
    label: "Flashcards",
    content: renderFlashcardsTab(),
  },
  {
    name: "Quizzes",
    label: "Quizzes",
    content: renderQuizzesTab(),
  },
];

if (loading) {
  return <Spinner />;
}

if (!document) {
  return (
    <div className="flex items-center justify-center min-h-[400px] text-slate-500 text-lg">
      Document not found.
    </div>
  );
}
 return (
  <div className="max-w-7xl mx-auto px-6 py-8">

    <div className="mb-6">
      <Link
        to="/documents"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--slate-blue)] hover:text-[var(--teal)] transition-colors duration-200"
      >
        <ArrowLeft size={16} />
        Back to Documents
      </Link>
    </div>

    <PageHeader title={document.data.title} />

    <div className="mt-6">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>

  </div>
);
}
export default DocumentDetailPage