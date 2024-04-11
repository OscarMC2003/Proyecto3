import CrearActividad from "@/components/actividades/crearActividad";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <CrearActividad />
    </main>
  );
}