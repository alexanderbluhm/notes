import { getCsrfToken } from "next-auth/client";

// Source: https://next-auth.js.org/configuration/pages#email-sign-in

function SignIn({ csrfToken }) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form
        className="max-w-md w-full "
        method="post"
        action="/api/auth/signin/email"
      >
        <h1 className="text-xl font-medium text-center">Login</h1>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="-space-y-px mt-8">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              className="appearance-none rounded-none bg-gray-900 relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
              required
              type="email"
              id="email"
              placeholder="E-Mail Address"
              name="email"
            />
          </div>

          <button
            className="rounded-none sm:text-sm rounded-b-md border bg-black hover:bg-gray-900 transition-colors border-gray-600 hover px-3 py-2 w-full focus:outline-none focus:ring-brand focus:border-brand focus:z-10"
            type="submit"
          >
            Sign in with Email
          </button>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}

SignIn.layoutProps = {
  navbar: false
}
export default SignIn;