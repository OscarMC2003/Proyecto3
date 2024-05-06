"use client"
import Perfil from "@/components/perfil/perfil";
import { useSearchParams } from "next/navigation";

export default function Home() {

  const valor = useSearchParams();
  const identificador = valor.get('id')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Perfil IdUserIniciado={identificador}/>
    </main>
  );
}