"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { LOCAL_STORAGE_KEYS, questions } from "@/const";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Quiz() {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const router = useRouter();

  const hasQuestion = useMemo(() => {
    return questionIndex < questions.length;
  }, [questionIndex]);

  const checkAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setQuestionIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (!hasQuestion) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.lastGame, String(score));
      const bestGame = Number(
        localStorage.getItem(LOCAL_STORAGE_KEYS.bestGame) || "0"
      );
      if (bestGame < score) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.bestGame, String(score));
      }
    }
    // eslint-disable-next-line
  }, [hasQuestion]);

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
              Pergunta {questionIndex + 1}: {questions[questionIndex].question}
            </h4>
            <div className="grid grid-cols-2 gap-4 w-full max-sm:grid-cols-1">
              {questions[questionIndex].answers.map((answer, index) => {
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
