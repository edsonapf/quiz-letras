"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <h1 className="text-3xl font-bold">Quiz Letras</h1>
      <Button onClick={() => router.push("/quiz")}>Começar o jogo</Button>
    </Container>
  );
}
