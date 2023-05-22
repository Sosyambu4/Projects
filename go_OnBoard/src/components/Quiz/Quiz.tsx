import { useEffect, useState } from "react";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";
import { EtapIdProps, QuestionesData } from "./ModelsQuizTypes";
import { QuestionCard } from "./QuizQuestion";

export const Quiz = ({ etapIdForQuiz }: EtapIdProps) => {
  const { etap_id, activitiesId } = etapIdForQuiz;
  const [quizIndex, setQuizIndex] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const quizes = useFirebaseFetch<QuestionesData>("quiz");
  const currentQuiz = quizes.find(
    (quizByEtapId) => quizByEtapId.etap_id === quizIndex
  );

  useEffect(() => {
    setQuizIndex(etap_id);
  }, [etapIdForQuiz]);

  if (!currentQuiz) {
    return <span>Brak Quizu</span>;
  }

  const currentQuestion = currentQuiz.questiones[questionIndex];

  if (!currentQuestion) {
    return <span>Brak pytania</span>;
  }

  return (
    <div>
      <QuestionCard
        currentQuestion={questionIndex}
        question={currentQuestion}
        lengthOfQuestions={currentQuiz.questiones.length}
        setQuestionIndex={setQuestionIndex}
        etapId={etap_id}
        currentActivityId={activitiesId}
      />
    </div>
  );
};
