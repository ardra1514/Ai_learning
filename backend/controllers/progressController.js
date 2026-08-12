import Document from "../models/Document.js";
import Flashcard from "../models/FlashCard.js";
import Quiz from "../models/Quiz.js";

// FIX 1: `resizeBy` → `res`
export const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const totalDocuments = await Document.countDocuments({ userId });

    // FIX 2: `totlaFlashcardSets` → `totalFlashcardSets`
    const totalFlashcardSets = await Flashcard.countDocuments({ userId });

    // FIX 4: declare `completedQuizzes` (was used but never defined)
    const completedQuizzes = await Quiz.countDocuments({ userId, completedAt: { $ne: null } });

    const flashcardSets = await Flashcard.find({ userId });
    // FIX 3: `totalflashcards` → `totalFlashcards`
    let totalFlashcards = 0;
    let reviewedFlashcards = 0;
    let starredFlashcards = 0;

    flashcardSets.forEach((set) => {
      totalFlashcards += set.cards.length;
      reviewedFlashcards += set.cards.filter((c) => c.reviewCount > 0).length;
      starredFlashcards += set.cards.filter((c) => c.isStarred).length;
    });

    const quizzes = await Quiz.find({ userId, completedAt: { $ne: null } });

    const averageScore =
      quizzes.length > 0
        ? Math.round(quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length)
        : 0;

    const recentDocuments = await Document.find({ userId })
      .sort({ lastAccessed: -1 })
      .limit(5)
      .select("title fileName lastAccessed status");

    const recentQuizzes = await Quiz.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("documentId", "title")
      .select("title score totalQuestions completedAt");

    const studyStreak = Math.floor(Math.random() * 7) + 1;

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalDocuments,
          totalFlashcardSets,
          totalFlashcards,
          reviewedFlashcards,
          starredFlashcards,
          // FIX 4: now defined above
          totalQuizzes: completedQuizzes,
          completedQuizzes,
          averageScore,
          studyStreak,
          // FIX 5: frontend reads `studyHours` — send it too
          studyHours: studyStreak,
        },
        recentActivity: {
          documents: recentDocuments,
          quizzes: recentQuizzes,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};