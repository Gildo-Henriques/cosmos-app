"use client"
import Link from "next/link";
import LogoCosmos from "./logo";
import BtnNavbar from "./btnNavbar";
import { useState } from "react";
export default function Navbar() {
  const [estaAberto, setEstaAberto] = useState(false);
  return (
    <header className="w-full space-y-1 fixed top-0 z-40 flex flex-col items-center justify-center lg:py-8 p-5">
      <div className="w-full flex justify-between items-center z-30 px-3 py-2 max-w-5xl bg-white/90 rounded-md shadow-md shadow-gray-400/15">
        <Link href={"/"} className="flex items-center">
          <LogoCosmos />
          <span className="lg:text-sm text-xs">COSMOS</span>
        </Link>
        <nav className="lg:flex items-center space-x-8 hidden text-[#3a3a3a] text-sm">
          <Link href={"#"}>Home</Link>
          <Link href={"#"}>Eventos</Link>
          <Link href={"#"}>Desafios</Link>
          <Link href={"#"}>Premiações</Link>
        </nav>
        <div className="flex items-center space-x-3 text-sm text-[#3a3a3a] *:rounded-lg">
          <Link
            href={"#"}
            className="lg:px-3 px-2 lg:py-2 py-[7px] shadow-md text-sm bg-white"
          >
            Entrar
          </Link>
          <Link
            href={"#"}
            className="bg-[#434343] text-sm hover:bg-[#313131] transition-all text-white lg:px-3 px-2 lg:py-2 py-[7px]"
          >
            Criar conta
          </Link>
          <div className="lg:hidden flex">
            <BtnNavbar estaAberto={estaAberto} setEstaAberto={setEstaAberto} />
          </div>
        </div>
      </div>
      {estaAberto && (
        <nav className="rounded-md lg:hidden flex *:hover:bg-slate-100 z-30 *:rounded-md space-y-1 w-full flex-col *:px-2 *:py-1 p-3 *:p shadow-md shadow-gray-400/15 bg-white">
          <Link href={"#"}>Home</Link>
          <Link href={"#"}>Eventos</Link>
          <Link href={"#"}>Desafios</Link>
          <Link href={"#"}>Premiações</Link>
        </nav>
      )}
      {estaAberto && (
        <div onClick={() => setEstaAberto(false)}
         className="bg-black/20 lg:hidden flex top-0 left-0 w-full h-screen absolute"></div>
      )}
    </header>
  );
}
