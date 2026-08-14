import React, { useContext, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// ================= PUBLIC PAGES =================

const LandingPage = lazy(() => import("./pages/LandingPage"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// ================= PROTECTED PAGES =================

const Dashboard = lazy(() =>
  import("./pages/dashboard/Dashboard")
);

const DocumentListPage = lazy(() =>
  import("./pages/Documents/DocumentListPage")
);

const DocumentDetailPage = lazy(() =>
  import("./pages/Documents/DocumentDetailPage")
);

const FlashcardListPage = lazy(() =>
  import("./pages/falshcard/FlashcardListPage")
);

const FlashCardPage = lazy(() =>
  import("./pages/falshcard/FlashCardPage")
);

const QuizTakePage = lazy(() =>
  import("./pages/Quizzes/QuizTakePage")
);

const QuizResultPage = lazy(() =>
  import("./pages/Quizzes/QuizResultPage")
);

const ProfilePage = lazy(() =>
  import("./pages/profile/ProfilePage")
);

// ================= LOADING COMPONENT =================

const PageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05161A] text-white">
      <div className="text-center">

        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#294D61] border-t-[#0F969C]" />

        <p className="text-[#B8D0D4]">
          Loading...
        </p>

      </div>
    </div>
  );
};

// ================= APP =================

const App = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>

      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/features"
          element={<FeaturesPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= PROTECTED ================= */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

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

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>

    </Suspense>
  );
};

export default App;