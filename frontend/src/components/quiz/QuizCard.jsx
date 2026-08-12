import React from "react";
import { Link } from "react-router-dom";
import { Play, BarChart2, Trash2, Award } from "lucide-react";
import moment from "moment";

const QuizCard = ({ quiz, onDelete }) => {
  return (
    <div className="relative group bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[var(--teal)] transition-all duration-300 overflow-hidden">

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(quiz);
        }}
        className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <Trash2
          className="w-5 h-5 mx-auto"
          strokeWidth={2}
        />
      </button>

      <div className="p-6">

        {/* Score Badge */}
        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-amber-100">

            <Award
              className="w-5 h-5 text-amber-500"
              strokeWidth={2.5}
            />

            <span className="text-sm font-semibold text-amber-700">
              Score : {quiz.score ?? 0}
            </span>

          </div>

        </div>

        {/* Quiz Title */}
        <div>

          <h3
            className="text-xl font-bold text-slate-800 line-clamp-2"
            title={quiz.title}
          >
            {quiz.title ||
              `Quiz - ${moment(quiz.createdAt).format(
                "MMM D, YYYY"
              )}`}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Created{" "}
            {moment(quiz.createdAt).format("MMM D, YYYY")}
          </p>

        </div>

        {/* Quiz Info */}
        <div className="mt-6">

          <div className="inline-flex px-4 py-2 rounded-full bg-[var(--light-blue)]/15">

            <span className="text-sm font-semibold text-[var(--teal-dark)]">
              {quiz.questions.length}{" "}
              {quiz.questions.length === 1
                ? "Question"
                : "Questions"}
            </span>

          </div>

        </div>

        {/* Action Button */}
        <div className="mt-8">

          {quiz.userAnswers?.length > 0 ? (

            <Link to={`/quizzes/${quiz._id}/results`}>

              <button className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-all">

                <BarChart2
                  className="w-5 h-5"
                  strokeWidth={2.5}
                />

                View Results

              </button>

            </Link>

          ) : (

            <Link to={`/quizzes/${quiz._id}`}>

              <button className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-2xl bg-gradient-to-r from-[var(--teal-dark)] to-[var(--teal)] text-white font-semibold shadow-lg hover:scale-105 transition-all">

                <Play
                  className="w-5 h-5"
                  strokeWidth={2.5}
                />

                Start Quiz

              </button>

            </Link>

          )}

        </div>

      </div>

    </div>
  );
};

export default QuizCard;