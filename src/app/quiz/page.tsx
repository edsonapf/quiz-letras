"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { quizes } from "@/const";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function Quiz() {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const router = useRouter();
  console.log({ score });

  const hasQuestion = useMemo(() => {
    return questionIndex < quizes.length;
  }, [questionIndex]);

  const checkAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setQuestionIndex((prev) => prev + 1);
  };

  return (
    <Container>
      <h1 className="font-bold text-xl">Perguntas</h1>
      <h4 className="font-medium text-lg">
        {hasQuestion
          ? `Pontuação: ${score} ponto(s)`
          : `Você fez ${score} ponto(s)`}
      </h4>
      <div className="flex flex-col items-center gap-4 w-full">
        {hasQuestion ? (
          <>
            <h4>
              Pergunta {questionIndex + 1}: {quizes[questionIndex].question}
            </h4>
            <div className="grid grid-cols-2 gap-4 w-full max-sm:grid-cols-1">
              {quizes[questionIndex].answers.map((answer, index) => {
                return (
                  <Button
                    key={`answer-${index}`}
                    onClick={() => checkAnswer(answer.isCorrect)}
                    fullwidth
                  >
                    {answer.title}
                  </Button>
                );
              })}
            </div>
          </>
        ) : (
          <Button onClick={() => router.back()}>Voltar para o início</Button>
        )}
      </div>
    </Container>
  );
}
