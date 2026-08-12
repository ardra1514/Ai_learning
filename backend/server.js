import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import dotenv from 'dotenv'
import errorHandler from './middleware/errorHandler.js'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import documentRoutes from './routes/documentRoutes.js'
import flashcardRoutes from './routes/flashcardRoutes.js'
import ai from './routes/aiRoutes.js'
import quiz from './routes/quizRoutes.js'
import progress from './routes/progressRoutes.js'
import * as geminiService from "./utils/geminiService.js";




dotenv.config()

const app = express()

connectDB()

// __dirname setup
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// routes here

app.use('/api/auth',authRoutes)
app.use('/api/document',documentRoutes)
app.use('/api/flashcards',flashcardRoutes)
app.use('/api/ai',ai)
app.use('/api/quizzes',quiz)
app.use('/api/progress',progress)


app.get("/test-gemini", async (req, res) => {
  try {
    const result = await geminiService.testGemini();
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});








// error handler
app.use(errorHandler)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    statusCode: 404,
  })
})

// start server
const PORT = process.env.PORT || 8000

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`)
})