import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  const features = [
    {
      icon: "📄",
      title: "PDF Analysis",
      description:
        "Upload your study PDFs and let Learnly AI analyze the content and understand the important information.",
    },
    {
      icon: "📝",
      title: "AI-Generated Short Notes",
      description:
        "Turn lengthy study materials into concise and easy-to-understand notes for faster revision.",
    },
    {
      icon: "❓",
      title: "AI-Generated Quizzes",
      description:
        "Generate quizzes from your study materials and test your understanding of important concepts.",
    },
    {
      icon: "🧠",
      title: "AI-Generated Flashcards",
      description:
        "Create useful flashcards from your documents to quickly review definitions, concepts, and key points.",
    },
    {
      icon: "📊",
      title: "Personal Learning Dashboard",
      description:
        "Manage your documents, quizzes, flashcards, and learning activities from one organized dashboard.",
    },
    {
      icon: "🤖",
      title: "AI Learning Assistance",
      description:
        "Get AI-powered assistance while studying and use your learning materials more effectively.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          AI Study Platform Features | PDF Notes, Quizzes & Flashcards | Learnly AI
        </title>

        <meta
          name="description"
          content="Explore Learnly AI features including PDF analysis, AI-generated short notes, quizzes, flashcards, and AI learning assistance."
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

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content="https://learnly-ai-six.vercel.app/features"
        />
      </Helmet>

      <main className="min-h-screen bg-[#05161A] text-white">

        {/* ================= NAVBAR ================= */}
        <nav className="sticky top-0 z-50 border-b border-[#294D61]/40 bg-[#05161A]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F969C] text-xl font-bold shadow-lg shadow-[#0F969C]/20">
                L
              </div>

              <span className="text-xl font-bold tracking-tight">
                Learnly <span className="text-[#6DA5C0]">AI</span>
              </span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <Link
                to="/"
                className="text-sm text-[#B8D0D4] transition hover:text-white"
              >
                Home
              </Link>

            

              <Link
                to="/features"
                className="text-sm font-semibold text-[#0F969C]"
              >
                Features
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="hidden rounded-lg px-4 py-2 text-sm text-[#B8D0D4] transition hover:bg-[#072E33] hover:text-white sm:block"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-[#0F969C] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#0F969C]/20 transition hover:bg-[#0C7075]"
              >
                Get Started
              </Link>
            </div>

          </div>
        </nav>

        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden">

          <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#0C7075]/20 blur-3xl" />

          <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#294D61]/30 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">

            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#0F969C]/40 bg-[#072E33] px-4 py-2 text-sm text-[#6DA5C0]">
              <span className="h-2 w-2 rounded-full bg-[#0F969C]" />
              Powerful AI Learning Tools
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Everything You Need to{" "}
              <span className="text-[#0F969C]">
                Study Smarter
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#B8D0D4]">
              Learnly AI transforms your study materials into
              useful learning resources with AI-powered tools
              designed to make studying easier and more effective.
            </p>

          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="border-t border-[#294D61]/40 bg-[#072E33]/40 px-6 py-20">

          <div className="mx-auto max-w-7xl">

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-[#294D61] bg-[#05161A] p-8 transition duration-300 hover:-translate-y-2 hover:border-[#0F969C] hover:shadow-xl hover:shadow-[#0F969C]/10"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0C7075]/30 text-3xl transition group-hover:bg-[#0F969C]/20">
                    {feature.icon}
                  </div>

                  <h2 className="mt-6 text-xl font-bold">
                    {feature.title}
                  </h2>

                  <p className="mt-3 leading-7 text-[#B8D0D4]">
                    {feature.description}
                  </p>

                </div>
              ))}

            </div>

          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="px-6 py-24">

          <div className="mx-auto max-w-6xl">

            <div className="text-center">

              <p className="text-sm font-semibold uppercase tracking-widest text-[#6DA5C0]">
                Simple & Powerful
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                One PDF. Multiple Ways to Learn.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-[#B8D0D4]">
                Learnly AI turns your study material into
                multiple learning resources automatically.
              </p>

            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-4">

              <div className="rounded-2xl border border-[#294D61] bg-[#072E33] p-6 text-center">
                <div className="text-4xl">📄</div>
                <h3 className="mt-4 font-bold">
                  Upload
                </h3>
                <p className="mt-2 text-sm text-[#B8D0D4]">
                  Upload your study PDF.
                </p>
              </div>

              <div className="rounded-2xl border border-[#294D61] bg-[#072E33] p-6 text-center">
                <div className="text-4xl">🤖</div>
                <h3 className="mt-4 font-bold">
                  Analyze
                </h3>
                <p className="mt-2 text-sm text-[#B8D0D4]">
                  AI understands your material.
                </p>
              </div>

              <div className="rounded-2xl border border-[#294D61] bg-[#072E33] p-6 text-center">
                <div className="text-4xl">📝</div>
                <h3 className="mt-4 font-bold">
                  Generate
                </h3>
                <p className="mt-2 text-sm text-[#B8D0D4]">
                  Create notes, quizzes and flashcards.
                </p>
              </div>

              <div className="rounded-2xl border border-[#294D61] bg-[#072E33] p-6 text-center">
                <div className="text-4xl">🧠</div>
                <h3 className="mt-4 font-bold">
                  Learn
                </h3>
                <p className="mt-2 text-sm text-[#B8D0D4]">
                  Study and revise effectively.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="px-6 pb-24">

          <div className="mx-auto max-w-5xl rounded-3xl border border-[#0C7075] bg-[#072E33] px-6 py-16 text-center shadow-2xl shadow-[#0F969C]/10 md:px-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F969C] text-3xl">
              🚀
            </div>

            <h2 className="mt-7 text-3xl font-bold md:text-4xl">
              Ready to Study Smarter?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#B8D0D4]">
              Upload your study materials and let Learnly AI
              turn them into smart learning resources.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link
                to="/register"
                className="rounded-xl bg-[#0F969C] px-7 py-3.5 font-semibold transition hover:bg-[#0C7075]"
              >
                Get Started →
              </Link>

              <Link
                to="/"
                className="rounded-xl border border-[#294D61] px-7 py-3.5 font-semibold text-[#B8D0D4] transition hover:border-[#6DA5C0] hover:text-white"
              >
                Back to Home
              </Link>

            </div>

          </div>

        </section>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-[#294D61]/40 bg-[#05161A] px-6 py-10">

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">

            <div>
              <p className="text-lg font-bold">
                Learnly <span className="text-[#6DA5C0]">AI</span>
              </p>

              <p className="mt-1 text-sm text-[#6DA5C0]">
                Learn smarter. Study faster.
              </p>
            </div>

            <div className="flex gap-6 text-sm text-[#B8D0D4]">

              <Link
                to="/"
                className="transition hover:text-white"
              >
                Home
              </Link>

             

              <Link
                to="/login"
                className="transition hover:text-white"
              >
                Login
              </Link>

            </div>

            <p className="text-sm text-[#6DA5C0]">
              © {new Date().getFullYear()} Learnly AI
            </p>

          </div>

        </footer>

      </main>
    </>
  );
};

export default FeaturesPage;