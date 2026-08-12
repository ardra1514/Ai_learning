import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | AI Study Platform</title>

        <meta
          name="description"
          content="The page you are looking for could not be found."
        />
      </Helmet>

      <main>
        <h1>Page Not Found</h1>

        <p>
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Go to Home
        </Link>
      </main>
    </>
  );
};

export default NotFoundPage;