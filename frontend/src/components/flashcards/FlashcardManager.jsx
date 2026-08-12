import React, { useState, useEffect } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  ArrowLeft,
  Sparkles,
  Brain,
} from "lucide-react";

import toast from "react-hot-toast";
import moment from "moment";


import Spinner from "../common/Spinner";
import Modal from "../common/Modal";
import Flashcard from "./Flashcard";
import aiService from "../../services/aiServices";
import flashcardService from "../../services/flashCardServices";
const FlashcardManager = ({ documentId }) => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
const [setToDelete, setSetToDelete] = useState(null);

console.log("FlashcardManager rendered");
console.log("documentId:", documentId);

const fetchFlashcardSets = async () => {
  console.log("Fetching flashcards...");

  setLoading(true);

  try {
    const response = await flashcardService.getFlashcardsForDocument(documentId);

    console.log("Response:", response);

    setFlashcardSets(response.data);
  } catch (error) {
    console.log("ERROR:", error);
  } finally {
    console.log("Finished");
    setLoading(false);
  }
};

useEffect(() => {
     console.log("Document ID:", documentId);
  if (documentId) {
    fetchFlashcardSets();
  }
}, [documentId]);

const handleGenerateFlashcards = async () => {
  setGenerating(true);

  try {
    await aiService.generateFlashcards(documentId);

    toast.success("Flashcards generated successfully!");

    fetchFlashcardSets();
  } catch (error) {
    toast.error(
      error.message || "Failed to generate flashcards."
    );
  } finally {
    setGenerating(false);
  }
};

const handleNextCard = () => {
  if (selectedSet) {
    handleReview(currentCardIndex);

    setCurrentCardIndex(
      (prevIndex) =>
        (prevIndex + 1) % selectedSet.cards.length
    );
  }
};

const handlePrevCard = () => {
  if (selectedSet) {
    handleReview(currentCardIndex);

    setCurrentCardIndex(
      (prevIndex) =>
        (prevIndex - 1 + selectedSet.cards.length) %
        selectedSet.cards.length
    );
  }
};

const handleReview = async (index) => {
  const currentCard =
    selectedSet?.cards[currentCardIndex];

  if (!currentCard) return;

  try {
    await flashcardService.reviewFlashcard(
      currentCard._id,
      index
    );

    toast.success("Flashcard reviewed!");
  } catch (error) {
    toast.error("Failed to review flashcard.");
  }
};

const handleToggleStar = async (cardId) => {
  try {
    await flashcardService.toggleStar(cardId);

    const updatedSets = flashcardSets.map((set) => {
      if (set._id === selectedSet._id) {

        const updatedCards = set.cards.map((card) =>
          card._id === cardId
            ? {
                ...card,
                isStarred: !card.isStarred,
              }
            : card
        );

        return {
          ...set,
          cards: updatedCards,
        };
      }

      return set;
    });

    setFlashcardSets(updatedSets);

    setSelectedSet(
      updatedSets.find(
        (set) => set._id === selectedSet._id
      )
    );

    toast.success("Flashcard starred status updated!");
  } catch (error) {
    toast.error("Failed to update star status.");
    console.error(error);
  }
};

const handleDeleteRequest = (e, set) => {
  e.stopPropagation();

  setSetToDelete(set);

  setIsDeleteModalOpen(true);
};

const handleConfirmDelete = async () => {
  if (!setToDelete) return;

  setDeleting(true);

  try {
    await flashcardService.deleteFlashcardSet(setToDelete._id);

    toast.success("Flashcard set deleted successfully!");

    setIsDeleteModalOpen(false);
    setSetToDelete(null);

    fetchFlashcardSets();
  } catch (error) {
    toast.error(error.message || "Failed to delete flashcard set.");
  } finally {
    setDeleting(false);
  }
};

const handleSelectSet = (set) => {
  setSelectedSet(set);

  setCurrentCardIndex(0);
};

const renderFlashcardViewer = () => {
  const currentCard = selectedSet.cards[currentCardIndex];

  return (
    <div className="space-y-8">

      {/* Back Button */}
      <button
        onClick={() => setSelectedSet(null)}
        className="inline-flex items-center gap-2 text-[var(--teal-dark)] font-medium hover:text-[var(--teal)] transition"
      >
        <ArrowLeft
          className="w-5 h-5"
          strokeWidth={2}
        />
        Back to Sets
      </button>

      {/* Flashcard */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <Flashcard
            flashcard={currentCard}
            onToggleStar={handleToggleStar}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5">

        {/* Previous */}
        <button
          onClick={handlePrevCard}
          disabled={selectedSet.cards.length <= 1}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft
            className="w-5 h-5"
            strokeWidth={2.5}
          />
          Previous
        </button>

        {/* Card Counter */}
        <div className="flex items-center gap-2">

          <span className="text-2xl font-bold text-[var(--secondary-dark)]">
            {currentCardIndex + 1}
          </span>

          <span className="text-slate-400 text-lg">
            /
          </span>

          <span className="text-lg font-semibold text-slate-500">
            {selectedSet.cards.length}
          </span>

        </div>

        {/* Next */}
        <button
          onClick={handleNextCard}
          disabled={selectedSet.cards.length <= 1}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--teal-dark)] to-[var(--teal)] text-white font-medium shadow hover:scale-105 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight
            className="w-5 h-5"
            strokeWidth={2.5}
          />
        </button>

      </div>

    </div>
  );
};

const renderSetList = () => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <Spinner />
      </div>
    );
  }
  if(flashcardSets.length === 0)
  {return (
    <div className="flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-slate-200 shadow-lg p-12 min-h-[500px]">

      {/* Icon */}
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--teal-dark)] to-[var(--teal)] flex items-center justify-center shadow-xl shadow-[var(--teal)]/20 mb-8">
        <Brain
          className="w-12 h-12 text-white"
          strokeWidth={2}
        />
      </div>

      {/* Title */}
      <h3 className="text-3xl font-bold text-[var(--secondary-dark)] mb-4">
        No Flashcards Yet
      </h3>

      {/* Description */}
      <p className="max-w-xl text-[15px] leading-7 text-[var(--slate-blue)] mb-10">
        Generate AI-powered flashcards from your document to reinforce
        important concepts and make learning faster and more effective.
      </p>

      {/* Button */}
      <button
        onClick={handleGenerateFlashcards}
        disabled={generating}
        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--teal-dark)] to-[var(--teal)] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {generating ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles
              className="w-5 h-5"
              strokeWidth={2}
            />
            Generate Flashcards
          </>
        )}
      </button>

    </div>
  )}


  {/* Flashcard Sets Grid */}
  return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {flashcardSets.map((set) => (
    <div
      key={set._id}
      onClick={() => handleSelectSet(set)}
      className="relative group cursor-pointer bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[var(--teal)] transition-all duration-300"
    >
      {/* Delete Button */}
      <button
        onClick={(e) => handleDeleteRequest(e, set)}
        className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
      >
        <Trash2
          className="w-4 h-4"
          strokeWidth={2}
        />
      </button>

      {/* Set Content */}
      <div className="flex items-start gap-4">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--teal-dark)] to-[var(--teal)] flex items-center justify-center shadow-lg">
          <Brain
            className="w-7 h-7 text-white"
            strokeWidth={2}
          />
        </div>

        <div className="flex-1">

          <h4 className="text-lg font-bold text-[var(--secondary-dark)]">
            Flashcard Set
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Created{" "}
            {moment(set.createdAt).format("MMM D, YYYY")}
          </p>

          <div className="mt-5 flex items-center justify-between">

            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--light-blue)]/15">
              <span className="text-sm font-semibold text-[var(--teal-dark)]">
                {set.cards.length}{" "}
                {set.cards.length === 1 ? "card" : "cards"}
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  ))}
</div>)





};

  return (
    <>
  <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-lg">
    {selectedSet ? renderFlashcardViewer() : renderSetList()}
  </div>
  {/* Delete Confirmation Modal */}
<Modal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  title="Delete Flashcard Set?"
>
  <div className="space-y-6">

    <p className="text-[15px] leading-7 text-slate-600">
      Are you sure you want to delete this flashcard set?
      This action cannot be undone and all cards will be
      permanently removed.
    </p>

    <div className="flex items-center justify-end gap-4">

      {/* Cancel Button */}
      <button
        type="button"
        onClick={() => setIsDeleteModalOpen(false)}
        disabled={deleting}
        className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-all duration-200 disabled:opacity-60"
      >
        Cancel
      </button>

      {/* Delete Button */}
      <button
        onClick={handleConfirmDelete}
        disabled={deleting}
        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {deleting ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Deleting...
          </span>
        ) : (
          "Delete Set"
        )}
      </button>

    </div>

  </div>
</Modal>
  </>
);
};

export default FlashcardManager;