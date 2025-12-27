import Navbar from "@/components/Navbar";
import Header from "../components/header/Header";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const HeaderOnly = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col -bg-blue">
      <Navbar title="Tạo đơn hàng" username="Nhà hàng 1" />
      <Header />

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default HeaderOnly;
