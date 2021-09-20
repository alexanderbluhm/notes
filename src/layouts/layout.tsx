import { Meta } from "@/components/common";
import React from "react";

interface Props {}

export const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen text-white bg-black">
        <main className="max-w-4xl px-4 pt-12 pb-12 mx-auto lg:px-6 xl:pt-20">
          {props.children}
        </main>
      </div>
    </>
  );
};
