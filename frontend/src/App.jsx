import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import LandingPage from "./pages/LandingPage";

import Dashboard from "./pages/dashboard/Dashboard";
import DocumentListPage from "./pages/Documents/DocumentListPage";
import DocumentDetailPage from "./pages/Documents/DocumentDetailPage";
import FlashcardListPage from "./pages/falshcard/FlashcardListPage";
import FlashCardPage from "./pages/falshcard/FlashCardPage";
import QuizTakePage from "./pages/Quizzes/QuizTakePage";
import QuizResultPage from "./pages/Quizzes/QuizResultPage";
import ProfilePage from "./pages/profile/ProfilePage";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import CoursesPage from "./pages/CoursesPage";
import FeaturesPage from "./pages/FeaturesPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>

      {/* PUBLIC LANDING PAGE */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/features" element={<FeaturesPage />} />

      {/* PUBLIC AUTH PAGES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED PAGES */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/documents"
          element={<DocumentListPage />}
        />

        <Route
          path="/documents/:id"
          element={<DocumentDetailPage />}
        />

        <Route
          path="/flashcards"
          element={<FlashcardListPage />}
        />

        <Route
          path="/documents/:id/flashcards"
          element={<FlashCardPage />}
        />

        <Route
          path="/quizzes/:quizId"
          element={<QuizTakePage />}
        />

        <Route
          path="/quizzes/:quizId/results"
          element={<QuizResultPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
};

export default App;