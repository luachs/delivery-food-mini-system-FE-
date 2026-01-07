import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import React from "react";

type Props = React.PropsWithChildren;

const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-l-2 text-gray-900">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout;
