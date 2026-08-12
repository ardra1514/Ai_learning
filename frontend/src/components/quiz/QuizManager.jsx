import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";




import Spinner from "../common/Spinner";
import Button from "../common/Button";
import Modal from "../common/Modal";
import QuizCard from "./QuizCard";
import quizService from "../../services/quizzServices";
import aiService from "../../services/aiServices";
import EmptyState from "../common/EmptyState";

const QuizManager = ({ documentId }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const [isGenerateModalOpen, setIsGenerateModalOpen] =
    useState(false);

  const [numQuestions, setNumQuestions] = useState(5);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [deleting, setDeleting] = useState(false);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
const fetchQuizzes = async () => {
  console.log("Fetching quizzes...");
  console.log("documentId:", documentId);

  setLoading(true);

  try {
    const data = await quizService.getQuizzesForDocument(documentId);

    console.log("Quiz API Response:", data);

    setQuizzes(data.data);
  } catch (error) {
    console.log("Quiz Error:", error);
    toast.error("Failed to fetch quizzes.");
  } finally {
    console.log("Finished loading");
    setLoading(false);
  }
};

  useEffect(() => {
    if (documentId) {
      fetchQuizzes();
    }
  }, [documentId]);

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();

    setGenerating(true);

    try {
      await aiService.generateQuiz(documentId, {
        numQuestions,
      });

      toast.success("Quiz generated successfully!");

      setIsGenerateModalOpen(false);

      fetchQuizzes();
    } catch (error) {
      toast.error(
        error.message || "Failed to generate quiz."
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteRequest = (quiz) => {
    setSelectedQuiz(quiz);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
  if (!selectedQuiz) return;

  setDeleting(true);

  try {
    await quizService.deleteQuiz(selectedQuiz._id);

    toast.success("Quiz deleted successfully!");

    setIsDeleteModalOpen(false);

    fetchQuizzes();
  } catch (error) {
    toast.error(
      error.message || "Failed to delete quiz."
    );
  } finally {
    setDeleting(false);
  }
};

  const renderQuizContent = () => {
  if (loading) {
    return <Spinner />;
  }

  if (quizzes.length === 0) {
    return (
      <EmptyState
        title="No Quizzes Yet"
        description="Generate a quiz from your document to test your knowledge."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz._id}
          quiz={quiz}
          onDelete={handleDeleteRequest}
        />
      ))}
    </div>
  );
};

return (
    <>
  <div className="bg-white border border-neutral-200 rounded-lg p-6">

    <div className="flex justify-end gap-2 mb-4">
      <Button
        onClick={() => setIsGenerateModalOpen(true)}
      >
        <Plus size={16} />
        Generate Quiz
      </Button>
    </div>

    {renderQuizContent()}
        {/* Generate Quiz Modal */}
<Modal
  isOpen={isGenerateModalOpen}
  onClose={() => setIsGenerateModalOpen(false)}
  title="Generate New Quiz"
>
  <form
    onSubmit={handleGenerateQuiz}
    className="space-y-6"
  >
    {/* Input */}
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Number of Questions
      </label>

      <input
        type="number"
        value={numQuestions}
        onChange={(e) =>
          setNumQuestions(
            Math.max(
              1,
              parseInt(e.target.value) || 1
            )
          )
        }
        min="1"
        required
        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[var(--teal)] focus:ring-4 focus:ring-[var(--teal)]/10 outline-none transition-all"
      />
    </div>

    {/* Buttons */}
    <div className="flex justify-end gap-4">

      <button
        type="button"
        onClick={() => setIsGenerateModalOpen(false)}
        disabled={generating}
        className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition disabled:opacity-60"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={generating}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--teal-dark)] to-[var(--teal)] text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {generating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          "Generate"
        )}
      </button>

    </div>
  </form>
</Modal>

{/* Delete Confirmation Modal */}
<Modal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  title="Confirm Delete Quiz"
>
  <div className="space-y-6">

    <p className="text-[15px] leading-7 text-slate-600">
      Are you sure you want to delete the quiz{" "}
      <span className="font-semibold text-[var(--secondary-dark)]">
        {selectedQuiz?.title || "this quiz"}
      </span>
      ? This action cannot be undone.
    </p>

    <div className="flex justify-end gap-4">

      {/* Cancel */}
      <button
        type="button"
        onClick={() => setIsDeleteModalOpen(false)}
        disabled={deleting}
        className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-all duration-200 disabled:opacity-60"
      >
        Cancel
      </button>

      {/* Delete */}
      <button
        onClick={handleConfirmDelete}
        disabled={deleting}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {deleting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Deleting...
          </>
        ) : (
          "Delete Quiz"
        )}
      </button>

    </div>

  </div>
</Modal>

  </div>
  </>
);
};

export default QuizManager;