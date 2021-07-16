import { useSession, signIn, signOut } from "next-auth/client";
import React from "react";

interface Props {}

export const Navbar = (props: Props) => {
  const [session, loading] = useSession();
  return (
    <nav role="main" className="py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4 lg:px-6">
        <span className="font-medium">Notelist</span>
        {!session && (
          <>
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {session && (
          <>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </div>
    </nav>
  );
};
