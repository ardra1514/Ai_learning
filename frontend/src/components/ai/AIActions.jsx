import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Sparkles, BookOpen, Lightbulb } from "lucide-react";
import toast from "react-hot-toast";
import MarkdownRenderer from "../common/MarkdownRenderer";
import aiService from "../../services/aiServices";
import Modal from "../common/Modal";



 

const AIActions = () => {
   const { id: documentId } = useParams();

  const [loadingAction, setLoadingAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [concept, setConcept] = useState("");

  const handleGenerateSummary = async () => {
    setLoadingAction("summary");

    try {
      const { summary } = await aiService.generateSummary(documentId);

      setModalTitle("Generated Summary");
      setModalContent(summary);
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Failed to generate summary.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleExplainConcept = async (e) => {
    e.preventDefault();

    if (!concept.trim()) {
      toast.error("Please enter a concept to explain.");
      return;
    }

    setLoadingAction("explain");

    try {
      const { explanation } = await aiService.explainConcept(
        documentId,
        concept
      );

      setModalTitle(`Explanation of "${concept}"`);
      setModalContent(explanation);
      setIsModalOpen(true);
      setConcept("");
    } catch (error) {
      toast.error("Failed to explain concept.");
    } finally {
      setLoadingAction(null);
    }
  };
return (
  <>
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8">
        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--teal-dark)] to-[var(--teal)] flex items-center justify-center shadow-lg">
            <Sparkles
              className="w-8 h-8 text-white"
              strokeWidth={2}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--secondary-dark)]">
              AI Assistant
            </h2>

            <p className="text-sm text-[var(--slate-blue)] mt-1">
              Let AI summarize your document or explain difficult concepts.
            </p>
          </div>

        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Summary */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 hover:shadow-xl transition">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--teal-dark)] to-[var(--teal)] flex items-center justify-center mb-5">
            <BookOpen className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-xl font-semibold text-[var(--secondary-dark)]">
            Generate Summary
          </h3>

          <p className="mt-3 text-sm text-slate-500 leading-6">
            Create a concise summary of the complete document using AI.
          </p>

          <button
            onClick={handleGenerateSummary}
            disabled={loadingAction === "summary"}
            className="mt-6 w-full h-12 rounded-xl bg-gradient-to-r from-[var(--teal-dark)] to-[var(--teal)] text-white font-semibold hover:scale-[1.02] transition"
          >
            {loadingAction === "summary" ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              "Generate Summary"
            )}
          </button>

        </div>

        {/* Explain Concept */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 hover:shadow-xl transition">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--slate-blue)] to-[var(--light-blue)] flex items-center justify-center mb-5">
            <Lightbulb className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-xl font-semibold text-[var(--secondary-dark)]">
            Explain Concept
          </h3>

          <p className="mt-3 text-sm text-slate-500">
            Enter any topic from the document and let AI explain it in simple words.
          </p>

          <form
            onSubmit={handleExplainConcept}
            className="mt-6 space-y-4"
          >
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Example: Closures, React Hooks..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/20"
            />

            <button
              type="submit"
              disabled={loadingAction === "explain"}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[var(--slate-blue)] to-[var(--light-blue)] text-white font-semibold hover:scale-[1.02] transition"
            >
              {loadingAction === "explain" ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Explaining...
                </span>
              ) : (
                "Explain Concept"
              )}
            </button>

          </form>

        </div>

      </div>
    </div>
    {/* Result Modal */}
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title={modalTitle}
>
  <div className="max-h-[60vh] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-6">
    <MarkdownRenderer content={modalContent} />
  </div>
</Modal>
  </>
);

}

export default AIActions