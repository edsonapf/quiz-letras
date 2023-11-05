"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { LOCAL_STORAGE_KEYS } from "@/const";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const lastGame =
    (typeof window !== undefined &&
      localStorage.getItem(LOCAL_STORAGE_KEYS.lastGame)) ||
    0;
  const bestGame =
    (typeof window !== undefined &&
      localStorage.getItem(LOCAL_STORAGE_KEYS.bestGame)) ||
    0;

  return (
    <Container>
      <h1 className="text-3xl font-bold">Quiz Letras</h1>
      <div className="flex gap-8">
        <h4>Última partida: {lastGame} ponto(s)</h4>
        <h4>Melhor partida: {bestGame} ponto(s)</h4>
      </div>
      <Button onClick={() => router.push("/quiz")}>Começar o jogo</Button>
    </Container>
  );
}
