"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { LOCAL_STORAGE_KEYS } from "@/const";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [lastGame, setLastGame] = useState(0);
  const [bestGame, setBestGame] = useState(0);

  useEffect(() => {
    setLastGame(
      Number(localStorage.getItem(LOCAL_STORAGE_KEYS.lastGame) || "0")
    );
    setBestGame(
      Number(localStorage.getItem(LOCAL_STORAGE_KEYS.bestGame) || "0")
    );
  }, []);

  return (
    <Container>
      <h1 className="text-3xl font-bold">Quiz Letras</h1>
      <div className="flex gap-8 max-sm:flex-col sm:gap-6">
        <h4>Última partida: {lastGame} ponto(s)</h4>
        <h4>Melhor partida: {bestGame} ponto(s)</h4>
      </div>
      <Button onClick={() => router.push("/quiz")}>Começar o jogo</Button>
    </Container>
  );
}
