import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  return (
    <>
      <Helmet>
  <title>
    AI Study Platform Features | PDF Notes, Quizzes & Flashcards | Learnly AI
  </title>

  <meta
    name="description"
    content="Explore Learnly AI features including PDF analysis, AI-generated short notes, quizzes, flashcards, and personalized AI learning assistance."
  />

  <link
    rel="canonical"
    href="https://learnly-ai-six.vercel.app/features"
  />

  <meta
    property="og:title"
    content="AI Study Platform Features | Learnly AI"
  />

  <meta
    property="og:description"
    content="Turn your study PDFs into short notes, quizzes, and flashcards with Learnly AI."
  />

  <meta
    property="og:type"
    content="website"
  />

  <meta
    property="og:url"
    content="https://learnly-ai-six.vercel.app/features"
  />
</Helmet>

      <main>

        <h1>
          AI-Powered Study Platform Features
        </h1>

        <p>
          Use AI-powered tools to turn your study materials
          into useful learning resources.
        </p>


        <section>
          <h2>PDF Analysis</h2>

          <p>
            Upload your study PDFs and let AI analyze the
            content of your documents.
          </p>
        </section>


        <section>
          <h2>AI-Generated Short Notes</h2>

          <p>
            Convert lengthy study materials into concise
            notes that are easier to understand and revise.
          </p>
        </section>


        <section>
          <h2>AI-Generated Quizzes</h2>

          <p>
            Create quizzes from your study materials and
            test your understanding of important concepts.
          </p>
        </section>


        <section>
          <h2>AI-Generated Flashcards</h2>

          <p>
            Create flashcards from your documents for
            quick revision and better memory.
          </p>
        </section>


        <section>
          <h2>Personal Learning Dashboard</h2>

          <p>
            Manage your documents, flashcards, quizzes,
            and learning activities from one place.
          </p>
        </section>


        <section>
          <h2>AI Learning Assistance</h2>

          <p>
            Get AI-powered assistance while studying and
            use your learning materials more effectively.
          </p>
        </section>


        <section>
          <h2>Start Learning</h2>

          <p>
            Create an account and start using AI-powered
            tools to improve your learning experience.
          </p>

          <Link
            to="/register"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Get Started
          </Link>
        </section>

      </main>
    </>
  );
};

export default FeaturesPage;