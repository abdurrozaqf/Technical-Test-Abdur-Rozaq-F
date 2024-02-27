import { ReactNode } from "react";
import Navbar from "./Navbar";
import { Toaster } from "../ui/toaster";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Readonly<Props>) => {
  return (
    <div className="bg-gradient-to-tl from-indigo-400 to-indigo-500">
      <div className="container w-full h-screen flex flex-col transition-all overflow-auto ">
        <Navbar />
        <div className="flex grow flex-col overflow-auto pb-6">{children}</div>
        <Toaster />
      </div>
    </div>
  );
};

export default Layout;
