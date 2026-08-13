import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Learnly AI</title>

        <meta
          name="description"
          content="The page you are looking for could not be found on Learnly AI."
        />
      </Helmet>

      <main className="min-h-screen bg-[#05161A] text-white">

        {/* Navbar */}
        <nav className="border-b border-[#294D61]/40 bg-[#05161A]/90">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F969C] text-xl font-bold shadow-lg shadow-[#0F969C]/20">
                L
              </div>

              <span className="text-xl font-bold">
                Learnly <span className="text-[#6DA5C0]">AI</span>
              </span>
            </Link>

            <Link
              to="/"
              className="rounded-lg border border-[#294D61] px-4 py-2 text-sm text-[#B8D0D4] transition hover:border-[#0F969C] hover:text-white"
            >
              Home
            </Link>

          </div>
        </nav>

        {/* 404 Content */}
        <section className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden px-6">

          {/* Glow effects */}
          <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-[#0C7075]/20 blur-3xl" />

          <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-[#294D61]/20 blur-3xl" />

          <div className="relative max-w-2xl text-center">

            {/* 404 */}
            <div className="text-[120px] font-black leading-none tracking-tight text-[#0F969C]/20 sm:text-[180px]">
              404
            </div>

            {/* Icon */}
            <div className="-mt-16 text-6xl sm:-mt-24">
              🔍
            </div>

            <h1 className="mt-8 text-4xl font-extrabold md:text-5xl">
              Page Not Found
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-[#B8D0D4]">
              Looks like this learning resource doesn't exist.
              Don't worry — there are plenty of things waiting
              for you on Learnly AI.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link
                to="/"
                className="rounded-xl bg-[#0F969C] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#0F969C]/20 transition hover:-translate-y-1 hover:bg-[#0C7075]"
              >
                ← Back to Home
              </Link>

              <Link
                to="/features"
                className="rounded-xl border border-[#294D61] bg-[#072E33] px-7 py-3.5 font-semibold text-[#B8D0D4] transition hover:-translate-y-1 hover:border-[#0F969C] hover:text-white"
              >
                Explore Features
              </Link>

            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#294D61]/40 bg-[#05161A] px-6 py-6 text-center">
          <p className="text-sm text-[#6DA5C0]">
            © {new Date().getFullYear()} Learnly AI · Learn smarter. Study faster.
          </p>
        </footer>

      </main>
    </>
  );
};

export default NotFoundPage;