import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-screen h-screen items-center px-3 justify-center bg-[#0e0e10]">
      {children}
    </div>
  );
};

export default Layout;
