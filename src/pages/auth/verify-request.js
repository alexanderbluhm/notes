import React from "react";

const verifyRequest = ({ baseUrl }) => {
  return (
    <section
      aria-labelledby="verify"
      className="h-screen flex items-center justify-center"
    >
      <h1 id="verify" className="sr-only">
        Verify Request
      </h1>
      <div className="max-w-md space-y-1">
        <h2 className="text-xl font-medium text-center">Check your email</h2>
        <p>A sign in link has been sent to your email address.</p>
      </div>
    </section>
  );
};

verifyRequest.layoutProps = {
  navbar: false,
};
export default verifyRequest;
