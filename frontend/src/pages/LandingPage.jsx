import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LandingPage = () => {
  return (
    <>
  <Helmet>
  <title>
    Learnly AI | Turn PDFs into Notes, Quizzes & Flashcards
  </title>

  <meta
    name="description"
    content="Learnly AI helps students turn study PDFs into short notes, quizzes, and flashcards using AI. Upload your study material and study smarter."
  />

  <link
    rel="canonical"
    href="https://learnly-ai-six.vercel.app/"
  />

  {/* Open Graph */}
  <meta
    property="og:title"
    content="Learnly AI | AI-Powered Study Platform"
  />

  <meta
    property="og:description"
    content="Turn study PDFs into short notes, quizzes, and flashcards with Learnly AI."
  />

  <meta
    property="og:type"
    content="website"
  />

  <meta
    property="og:url"
    content="https://learnly-ai-six.vercel.app/"
  />

  {/* Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Learnly AI",
      description:
        "AI-powered study platform that turns study PDFs into short notes, quizzes, and flashcards.",
      url: "https://learnly-ai-six.vercel.app/",
    })}
  </script>
</Helmet>

      <main>

        {/* ================= HERO ================= */}
        <section>
          <h1>
            Turn Your Study PDFs Into Smart Learning Materials
          </h1>

          <p>
            Upload your study PDFs and let AI create short notes,
            flashcards, and quizzes to help you understand your
            study material and prepare faster.
          </p>

          <div>
            <Link
              to="/register"
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
            >
              Start Learning
            </Link>

            <Link
              to="/courses"
              className="inline-block mt-4 ml-4 px-6 py-3 border border-blue-600 text-blue-600 rounded-lg"
            >
              Explore Courses
            </Link>
          </div>
        </section>


        {/* ================= ABOUT PLATFORM ================= */}
        <section>
          <h2>
            Learn Smarter With AI
          </h2>

          <p>
            Our AI-powered learning platform helps students turn
            lengthy study materials into simple and useful learning
            resources. Upload a PDF and use AI to generate short notes,
            quizzes, and flashcards for easier learning and revision.
          </p>
        </section>


        {/* ================= PDF UPLOAD ================= */}
        <section>
          <h2>
            Upload Your Study PDF
          </h2>

          <p>
            Upload your study material as a PDF and let our AI
            analyze the content to make learning easier and more
            organized.
          </p>
        </section>


        {/* ================= SHORT NOTES ================= */}
        <section>
          <h2>
            Generate Short Notes with AI
          </h2>

          <p>
            Turn lengthy study materials into concise short notes
            that make revision faster and easier. Focus on the
            important concepts without reading the entire document
            repeatedly.
          </p>
        </section>


        {/* ================= QUIZZES ================= */}
        <section>
          <h2>
            Create Quizzes from Your Study Material
          </h2>

          <p>
            Generate quizzes from your uploaded PDFs and test
            how well you understand the study material. Practice
            questions can help you identify topics that need more
            attention.
          </p>
        </section>


        {/* ================= FLASHCARDS ================= */}
        <section>
          <h2>
            Generate Flashcards for Revision
          </h2>

          <p>
            Create flashcards from your study materials and use
            them to quickly review important concepts, definitions,
            and key points.
          </p>
        </section>


        {/* ================= AI ASSISTANT ================= */}
        <section>
          <h2>
            AI-Powered Study Assistant
          </h2>

          <p>
            Use AI to understand difficult topics, review your
            study material, and get assistance while learning.
          </p>
        </section>


        {/* ================= HOW IT WORKS ================= */}
        <section>
          <h2>
            How Our AI Study Platform Works
          </h2>

          <ol>
            <li>
              <strong>Upload your PDF</strong>
              <p>
                Add your study material to the platform.
              </p>
            </li>

            <li>
              <strong>Let AI analyze it</strong>
              <p>
                Our AI processes the content of your document.
              </p>
            </li>

            <li>
              <strong>Generate learning materials</strong>
              <p>
                Get short notes, quizzes, and flashcards
                based on your study material.
              </p>
            </li>

            <li>
              <strong>Study and test yourself</strong>
              <p>
                Use the generated materials to revise and
                test your knowledge.
              </p>
            </li>
          </ol>
        </section>


        {/* ================= WHY USE US ================= */}
        <section>
          <h2>
            Why Use Our AI Study Platform?
          </h2>

          <ul>
            <li>
              Convert lengthy PDFs into easy-to-read short notes
            </li>

            <li>
              Generate quizzes from your study material
            </li>

            <li>
              Create flashcards for quick revision
            </li>

            <li>
              Use AI to understand difficult topics
            </li>

            <li>
              Organize your learning materials
            </li>

            <li>
              Study and revise at your own pace
            </li>
          </ul>
        </section>


        {/* ================= COURSES ================= */}
        <section>
          <h2>
            Explore Learning Resources
          </h2>

          <p>
            Explore our learning resources and improve your
            understanding of important academic and technical
            concepts.
          </p>

          <Link
            to="/courses"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Explore Courses
          </Link>
        </section>


        {/* ================= CTA ================= */}
        <section>
          <h2>
            Start Studying Smarter Today
          </h2>

          <p>
            Upload your study materials, generate AI-powered
            learning resources, and make your study sessions
            more effective.
          </p>

          <Link
            to="/register"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Create Free Account
          </Link>
          <Link
  to="/features"
  className="inline-block mt-4 px-6 py-3 border border-blue-600 text-blue-600 rounded-lg"
>
  View Features
</Link>
        </section>

      </main>
    </>
  );
};

export default LandingPage;