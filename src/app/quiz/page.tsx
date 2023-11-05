"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { LOCAL_STORAGE_KEYS, questions } from "@/const";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Quiz() {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [chooseAnswer, setChooseAnswer] = useState(-1);
  const router = useRouter();

  const hasQuestion = useMemo(() => {
    return questionIndex < questions.length;
  }, [questionIndex]);

  const question = useMemo(() => {
    return hasQuestion ? questions[questionIndex] : null;
  }, [questionIndex, hasQuestion]);

  const answers = useMemo(() => {
    return hasQuestion ? questions[questionIndex].answers : [];
  }, [questionIndex, hasQuestion]);

  const chooseCorrectAnswer = useMemo(() => {
    return hasQuestion ? question?.correctAnswer === chooseAnswer : false;
  }, [question, chooseAnswer, hasQuestion]);

  const checkAnswer = (answerIndex: number) => {
    const correctAnswer = questions[questionIndex].correctAnswer;
    if (answerIndex === correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setChooseAnswer(answerIndex);
  };

  const nextQuestion = () => {
    setChooseAnswer(-1);
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
              Pergunta {questionIndex + 1}: {question?.question}
            </h4>
            <div className="grid grid-cols-2 gap-4 w-full max-sm:grid-cols-1">
              {answers.map((answer, index) => {
                return (
                  <Button
                    key={`answer-${index}`}
                    onClick={() => checkAnswer(index)}
                    fullwidth
                    disabled={chooseAnswer >= 0}
                    isCorrectAnswer={
                      chooseAnswer >= 0 && question?.correctAnswer === index
                    }
                    isWrongAnswer={
                      chooseAnswer >= 0 &&
                      chooseAnswer === index &&
                      question?.correctAnswer !== chooseAnswer
                    }
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
      {chooseAnswer >= 0 && (
        <h4
          className={`font-medium text-lg ${
            chooseCorrectAnswer ? "text-green-500" : " text-red-500"
          }`}
        >
          {chooseCorrectAnswer ? "Você acertou!" : "Você errou!"}
        </h4>
      )}
      {chooseAnswer >= 0 && (
        <Button onClick={nextQuestion}>Próxima pergunta</Button>
      )}
    </Container>
  );
}
