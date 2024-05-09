"use client"
import ForoInterior from "@/components/foro/foroInterior";
import { useSearchParams } from "next/navigation"

export default function Home() {
  const valor = useSearchParams();
  const identificadorForo = valor.get('foroId')
  const identificadorUser = valor.get('idUserIniciado')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ForoInterior IDs={{identificadorUser, identificadorForo}}/>
    </main>
  );
}