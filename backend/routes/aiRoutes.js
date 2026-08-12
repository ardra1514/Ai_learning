import express from "express";
import protect from "../middleware/auth.js";
import {
  chat,
  explainConcept,
  generateFlashcards,
  generateQuiz,
  generateSummary,
  getChatHistory,
} from "../controllers/aiController.js";

const router = express.Router();

router.use(protect);

router.post("/generate-flashcards", generateFlashcards);
router.post("/generate-quiz", generateQuiz);

// Fixed spelling
router.post("/generate-summary", generateSummary);

// Fixed route name
router.post("/chat", chat);

router.post("/explain-concept", explainConcept);

// Use GET for fetching history
router.get("/chat-history/:documentId", getChatHistory);

export default router;