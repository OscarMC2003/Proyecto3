/*"use client"
import Actividad from "@/components/actividades/actividad";
import { useSearchParams } from "next/navigation";

export default function Home() {

  const valor = useSearchParams();
  const identificadorUser = valor.get('id')
  const identificadorActi = valor.get('acti')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Actividad IDs={{identificadorUser, identificadorActi}}/> 
    </main>
  );
}*/