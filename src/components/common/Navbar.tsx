import { useSession, signIn, signOut } from "next-auth/client";
import React from "react";
import { Menu, Transition } from "@headlessui/react";

interface Props {}

export const Navbar = (props: Props) => {
  const [session, loading] = useSession();
  const userTag = session?.user?.name || session?.user?.email;

  return (
    <nav role="main" className="py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4 lg:px-6">
        <div className="flex items-center space-x-2">
          <svg
            className="w-8 h-8"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="20" fill="url(#paint0_linear)" />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="9.5"
                y1="9"
                x2="37"
                y2="39.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#818CF8" />
                <stop offset="1" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </svg>

          <a href="/" className="font-medium">Notelist</a>
        </div>
        {!session && (
          <>
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {session && (
          <Menu as="div" className="relative">
            {({ open }) => (
              <>
                <Menu.Button
                  className={`${
                    open ? "bg-gray-800" : ""
                  } p-1.5 inline-flex items-center rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors duration-200`}
                >
                  <span className="sr-only">Open user menu</span>
                  <div
                    aria-hidden="true"
                    className="uppercase inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-900"
                  >
                    <span className="text-xs font-medium">
                      {userTag.charAt(0)}
                    </span>
                  </div>
                  <svg aria-hidden="true" className="w-6 h-6" fill="none">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15.25 10.75L12 14.25l-3.25-3.5"
                    />
                  </svg>
                </Menu.Button>

                <Transition
                  as={React.Fragment}
                  enter="transition duration-125 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-100 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items
                    className="absolute z-10 top-full right-0 w-36 mt-1 -mr-0.5 bg-gray-900 shadow-lg rounded-md py-1 text-base ring-1 ring-brand ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    as="ul"
                  >
                    <Menu.Item
                      as="button"
                      className="w-full"
                      onClick={() => signOut()}
                    >
                      {({ active }) => (
                        <span
                          className={`${
                            active ? "bg-gray-800 text-white" : ""
                          } flex items-center w-full cursor-default select-none py-2 px-3`}
                        >
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M15.75 8.75L19.25 12L15.75 15.25"
                            ></path>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M19 12H10.75"
                            ></path>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M15.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H15.25"
                            ></path>
                          </svg>
                          Sign Out
                        </span>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        )}
      </div>
    </nav>
  );
};
