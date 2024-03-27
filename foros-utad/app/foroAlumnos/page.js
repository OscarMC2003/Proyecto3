"use client"
import Foros from "@/components/foro/foroAlumnos";
import { useSearchParams } from "next/navigation";

export default function Home() {

  const valor = useSearchParams();
  const identificador = valor.get('id')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Foros IdUserIniciado={identificador}/>
    </main>
  );
}