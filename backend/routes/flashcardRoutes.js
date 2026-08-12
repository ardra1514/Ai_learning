import express from 'express'
import { deleteFlashcardSet, getAllFlashcardSets, getFlashcards, reviewFlashCard, toggleStarFlashcard } from '../controllers/flashCardController.js';
import protect from '../middleware/auth.js';


const router = express.Router();
router.use(protect);

router.get('/',getAllFlashcardSets);
router.get('/:documentId',getFlashcards)
router.post('/:cardId/review',reviewFlashCard)
router.put('/:cardId/star',toggleStarFlashcard)
router.delete('/:id',deleteFlashcardSet)





export default router;