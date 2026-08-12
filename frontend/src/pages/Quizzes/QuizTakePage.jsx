import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

import quizService from "../../services/quizzServices";
import Spinner from "../../components/common/Spinner";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import toast from "react-hot-toast";


const QuizTakePage = () => {
  const { quizId } = useParams();
const navigate = useNavigate();

const [quiz, setQuiz] = useState(null);
const [loading, setLoading] = useState(true);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [selectedAnswers, setSelectedAnswers] = useState({});
const [submitting, setSubmitting] = useState(false);

useEffect(() => {
  const fetchQuiz = async () => {
    try {
      const response = await quizService.getQuizById(quizId);
      setQuiz(response.data);
    } catch (error) {
      toast.error("Failed to fetch quiz.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchQuiz();
}, [quizId]);

const handleOptionChange = (questionId, optionIndex) => {
  setSelectedAnswers((prev) => ({
    ...prev,
    [questionId]: optionIndex,
  }));
};

const handleNextQuestion = () => {
  if (currentQuestionIndex < quiz.questions.length - 1) {
    setCurrentQuestionIndex((prev) => prev + 1);
  }
};

const handlePreviousQuestion = () => {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex((prev) => prev - 1);
  }
};
const handleSubmitQuiz = async () => {

};

if (loading) {
  return (
    <div className="">
      <Spinner />
    </div>
  );
}

if (!quiz || quiz.questions.length === 0) {
  return (
    <div className="">
      <div className="">
        <p className="">
          Quiz not found or has no questions.
        </p>
      </div>
    </div>
  );
}

const currentQuestion =
  quiz.questions[currentQuestionIndex];

const isAnswered =
  selectedAnswers.hasOwnProperty(currentQuestion._id);

const answeredCount =
  Object.keys(selectedAnswers).length;


  return (
  <div className="max-w-4xl mx-auto">

    <PageHeader title={quiz.title || "Take Quiz"} />

    {/* Progress */}
    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 mb-8">

      <div className="flex justify-between items-center mb-4">

        <span className="text-sm font-semibold text-slate-700">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </span>

        <span className="text-sm text-[var(--teal-dark)] font-medium">
          {answeredCount} Answered
        </span>

      </div>

      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--teal-dark)] to-[var(--teal)] transition-all duration-500"
          style={{
            width: `${
              ((currentQuestionIndex + 1) /
                quiz.questions.length) *
              100
            }%`,
          }}
        />

      </div>

    </div>

    {/* Question Card */}

    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8">

      <div className="inline-flex px-4 py-2 rounded-full bg-[var(--light-blue)]/20 mb-6">

        <span className="text-sm font-semibold text-[var(--teal-dark)]">
          Question {currentQuestionIndex + 1}
        </span>

      </div>

      <h2 className="text-2xl font-bold text-slate-800 leading-9 mb-8">
        {currentQuestion.question}
      </h2>

      <div className="space-y-4">

        {currentQuestion.options.map((option, index) => (

          <label
            key={index}
            className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
              selectedAnswers[currentQuestion._id] === index
                ? "border-[var(--teal)] bg-[var(--light-blue)]/15"
                : "border-slate-200 hover:border-[var(--teal)] hover:bg-slate-50"
            }`}
          >

            <input
              type="radio"
              name={currentQuestion._id}
              checked={
                selectedAnswers[currentQuestion._id] === index
              }
              onChange={() =>
                handleOptionChange(currentQuestion._id, index)
              }
              className="w-5 h-5 accent-[var(--teal)]"
            />

            <span className="text-slate-700 font-medium">
              {option}
            </span>

          </label>

        ))}

      </div>

      {/* Navigation */}

      <div className="flex justify-between items-center mt-10">

        <Button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft size={18} />
          Previous
        </Button>

        {currentQuestionIndex ===
        quiz.questions.length - 1 ? (

          <Button
            onClick={handleSubmitQuiz}
            disabled={
              submitting ||
              answeredCount !== quiz.questions.length
            }
          >
            <CheckCircle2 size={18} />
            {submitting
              ? "Submitting..."
              : "Submit Quiz"}
          </Button>

        ) : (

          <Button onClick={handleNextQuestion}>
            Next
            <ChevronRight size={18} />
          </Button>

        )}

      </div>

    </div>

  </div>
);
}

export default QuizTakePage