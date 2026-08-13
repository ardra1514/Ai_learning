import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const CoursesPage = () => {
  return (
    <>
      <Helmet>
  <title>
    AI Courses | Learn Artificial Intelligence & Machine Learning | Learnly AI
  </title>

  <meta
    name="description"
    content="Explore AI, machine learning, Python, and programming courses on Learnly AI. Build practical technology skills and learn with AI-powered study tools."
  />

  <link
    rel="canonical"
    href="https://learnly-ai-six.vercel.app/courses"
  />

  <meta
    property="og:title"
    content="AI Courses | Learn AI & Machine Learning | Learnly AI"
  />

  <meta
    property="og:description"
    content="Explore AI, machine learning, Python, and programming courses with Learnly AI."
  />

  <meta
    property="og:type"
    content="website"
  />

  <meta
    property="og:url"
    content="https://learnly-ai-six.vercel.app/courses"
  />
</Helmet>

      <main>

        <h1>AI Courses and Learning Resources</h1>

        <p>
          Explore courses and learning resources to build your skills
          in artificial intelligence, machine learning, programming,
          and related technologies.
        </p>

        <section>
          <h2>Artificial Intelligence</h2>

          <p>
            Learn the fundamentals of artificial intelligence and
            understand how AI is used to solve real-world problems.
          </p>

          <Link to="/register">
            Start Learning
          </Link>
        </section>

        <section>
          <h2>Machine Learning</h2>

          <p>
            Learn machine learning concepts, algorithms, model training,
            and other important topics.
          </p>

          <Link to="/register">
            Start Learning
          </Link>
        </section>

        <section>
          <h2>Python Programming</h2>

          <p>
            Learn Python programming fundamentals and build the
            programming skills needed for AI and machine learning.
          </p>

          <Link to="/register">
            Start Learning
          </Link>
        </section>

      </main>
    </>
  );
};

export default CoursesPage;