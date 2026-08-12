import { RotateCcw, Star } from 'lucide-react';
import React, { useState } from 'react'

const Flashcard = ({ flashcard, onToggleStar }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-full h-[420px]"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 transform-gpu cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped
            ? "rotateY(180deg)"
            : "rotateY(0deg)",
        }}
        onClick={handleFlip}
      >

        {/* Front Side */}
        <div
          className="absolute inset-0 bg-white rounded-3xl border border-slate-200 shadow-xl p-8 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >

          {/* Star Button */}
          <div className="flex justify-between items-center mb-8">

            <div className="px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
              Question
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(flashcard._id);
              }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                flashcard.isStarred
                  ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg"
                  : "bg-slate-100 text-slate-500 hover:bg-yellow-100 hover:text-yellow-500"
              }`}
            >
              <Star
                className="w-5 h-5"
                strokeWidth={2}
                fill={flashcard.isStarred ? "currentColor" : "none"}
              />
            </button>

          </div>

          {/* Question */}
          <div className="flex-1 flex items-center justify-center text-center">

            <p className="text-2xl font-bold text-slate-800 leading-relaxed">
              {flashcard.question}
            </p>

          </div>

          {/* Flip Hint */}
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">

            <RotateCcw
              className="w-4 h-4"
              strokeWidth={2}
            />

            <span>Click to reveal answer</span>

          </div>

        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[var(--teal-dark)] to-[var(--teal)] rounded-3xl shadow-xl p-8 flex flex-col text-white"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >

          <div className="mb-8">

            <div className="inline-flex px-4 py-1 rounded-full bg-white/20 text-xs font-semibold">
              Answer
            </div>

          </div>

          <div className="flex-1 flex items-center justify-center">

            <p className="text-xl leading-8 text-center">
              {flashcard.answer}
            </p>

          </div>

          <div className="flex items-center justify-center gap-2 text-white/80 text-sm">

            <RotateCcw
              className="w-4 h-4"
              strokeWidth={2}
            />

            <span>Click to view question</span>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Flashcard;