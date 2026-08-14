import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>
         Learnly AI | AI PDF Study Tool for Notes, Quizzes & Flashcards
        </title>

       <meta
  name="description"
  content="Learnly AI is an AI PDF study tool that turns study PDFs into notes, quizzes, and flashcards. Upload your PDF and study smarter with AI."
/>

        <link
          rel="canonical"
          href="https://learnly-ai-six.vercel.app/"
        />

        <meta
          property="og:title"
          content="Learnly AI | AI-Powered Study Platform"
        />

        <meta
          property="og:description"
          content="Turn study PDFs into short notes, quizzes, and flashcards with Learnly AI."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content="https://learnly-ai-six.vercel.app/"
        />

       <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://learnly-ai-six.vercel.app/#website",
        name: "Learnly AI",
        url: "https://learnly-ai-six.vercel.app/",
        description:
          "Learnly AI is an AI-powered study platform that turns study PDFs into notes, quizzes, and flashcards."
      },
      {
        "@type": "Organization",
        "@id": "https://learnly-ai-six.vercel.app/#organization",
        name: "Learnly AI",
        url: "https://learnly-ai-six.vercel.app/"
      },
      {
        "@type": "WebApplication",
        "@id": "https://learnly-ai-six.vercel.app/#application",
        name: "Learnly AI",
        url: "https://learnly-ai-six.vercel.app/",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description:
          "AI-powered study platform that analyzes study PDFs and generates short notes, quizzes, and flashcards."
      }
    ]
  })}
</script>
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
                className="text-sm text-[#B8D0D4] transition hover:text-white"
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

          {/* Background glow */}
          <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#0C7075]/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-[#294D61]/30 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">

            {/* Hero content */}
            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0F969C]/40 bg-[#072E33] px-4 py-2 text-sm text-[#6DA5C0]">
                <span className="h-2 w-2 rounded-full bg-[#0F969C]" />
                AI-Powered Learning Platform
              </div>

              <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Turn Your PDFs Into{" "}
                <span className="text-[#0F969C]">
                  Smart Learning
                </span>{" "}
                Materials
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#B8D0D4]">
                Learnly AI is an AI-powered PDF study tool that turns your
  study materials into short notes, quizzes, and flashcards.
  Upload your PDF, understand difficult topics, and prepare
  faster..
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  to="/register"
                  className="rounded-xl bg-[#0F969C] px-7 py-3.5 font-semibold text-white shadow-xl shadow-[#0F969C]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#0C7075]"
                >
                  Start Learning →
                </Link>

              

              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-[#6DA5C0]">
                <span>✓ AI-powered</span>
                <span>✓ PDF learning</span>
                <span>✓ Smart revision</span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">

              <div className="absolute -inset-5 rounded-3xl bg-[#0F969C]/10 blur-2xl" />

              <div className="relative rounded-3xl border border-[#294D61] bg-[#072E33] p-6 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6DA5C0]">
                      AI Study Workspace
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Your Study Material
                    </h3>
                  </div>

                  <div className="rounded-xl bg-[#0F969C]/20 px-3 py-2 text-xl">
                    🤖
                  </div>
                </div>

                {/* PDF */}
                <div className="rounded-2xl border border-[#294D61] bg-[#05161A] p-5">

                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0C7075] text-2xl">
                      📄
                    </div>

                    <div>
                      <p className="font-semibold">
                        Machine Learning.pdf
                      </p>
                      <p className="text-sm text-[#6DA5C0]">
                        AI is analyzing your document...
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#294D61]">
                    <div className="h-full w-4/5 rounded-full bg-[#0F969C]" />
                  </div>
                </div>

                {/* Generated content */}
                <div className="mt-5 grid grid-cols-3 gap-3">

                  <div className="rounded-xl border border-[#294D61] bg-[#05161A] p-4 text-center">
                    <div className="text-2xl">📝</div>
                    <p className="mt-2 text-xs font-semibold">
                      Short Notes
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#294D61] bg-[#05161A] p-4 text-center">
                    <div className="text-2xl">❓</div>
                    <p className="mt-2 text-xs font-semibold">
                      Quiz
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#294D61] bg-[#05161A] p-4 text-center">
                    <div className="text-2xl">🧠</div>
                    <p className="mt-2 text-xs font-semibold">
                      Flashcards
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="border-t border-[#294D61]/40 bg-[#072E33]/40 px-6 py-24">

          <div className="mx-auto max-w-7xl">

            <div className="mx-auto max-w-2xl text-center">

              <p className="text-sm font-semibold uppercase tracking-widest text-[#6DA5C0]">
                Everything You Need
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Study Smarter With AI
              </h2>

              <p className="mt-4 text-[#B8D0D4]">
                Transform your study materials into useful
                learning resources with a few clicks.
              </p>

            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {[
               {
  icon: "📄",
  title: "AI PDF Analysis",
  text: "Upload your study PDFs and let AI analyze the content to help you understand your learning material.",
},
{
  icon: "📝",
  title: "AI PDF to Notes",
  text: "Turn lengthy study PDFs into concise notes for faster revision and easier understanding.",
},
{
  icon: "❓",
  title: "AI Quiz Generator",
  text: "Generate quizzes from your study PDFs and test your understanding of important concepts.",
},
{
  icon: "🧠",
  title: "AI Flashcard Generator",
  text: "Create flashcards from your study materials for quick and effective revision.",
},
{
  icon: "🤖",
  title: "AI Study Assistant",
  text: "Get AI-powered assistance to understand difficult concepts while studying your documents.",
},
{
  icon: "📊",
  title: "Learning Dashboard",
  text: "Manage your study documents, quizzes, flashcards, and learning activities in one place.",
},
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-[#294D61] bg-[#05161A] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#0F969C] hover:shadow-xl hover:shadow-[#0F969C]/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0C7075]/30 text-2xl">
                    {feature.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-[#B8D0D4]">
                    {feature.text}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="px-6 py-24">

          <div className="mx-auto max-w-7xl">

            <div className="text-center">

              <p className="text-sm font-semibold uppercase tracking-widest text-[#6DA5C0]">
                Simple Process
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                How Learnly AI Works
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-[#B8D0D4]">
                Turn your study material into useful learning
                resources in just a few simple steps.
              </p>

            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">

              {[
                {
                  number: "01",
                  icon: "📄",
                  title: "Upload Your PDF",
                  text: "Add your notes, textbook, study material or document.",
                },
                {
                  number: "02",
                  icon: "🤖",
                  title: "Let AI Analyze",
                  text: "Learnly AI processes your document and understands its content.",
                },
                {
                  number: "03",
                  icon: "🧠",
                  title: "Study & Practice",
                  text: "Get notes, quizzes and flashcards to learn and revise.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-[#294D61] bg-[#072E33] p-8"
                >
                  <span className="text-sm font-bold text-[#0F969C]">
                    {step.number}
                  </span>

                  <div className="mt-5 text-4xl">
                    {step.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-[#B8D0D4]">
                    {step.text}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="px-6 pb-24">

          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#0C7075] bg-[#072E33] px-6 py-16 text-center shadow-2xl shadow-[#0F969C]/10 md:px-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F969C] text-3xl">
              🚀
            </div>

            <h2 className="mt-7 text-3xl font-bold md:text-4xl">
              Start Studying Smarter Today
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#B8D0D4]">
              Upload your study materials, generate AI-powered
              learning resources and make every study session
              more effective.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link
                to="/register"
                className="rounded-xl bg-[#0F969C] px-7 py-3.5 font-semibold transition hover:bg-[#0C7075]"
              >
                Create Free Account →
              </Link>

              <Link
                to="/features"
                className="rounded-xl border border-[#294D61] px-7 py-3.5 font-semibold text-[#B8D0D4] transition hover:border-[#6DA5C0] hover:text-white"
              >
                View Features
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
                to="/features"
                className="hover:text-white"
              >
                Features
              </Link>

              <Link
                to="/login"
                className="hover:text-white"
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

export default LandingPage;