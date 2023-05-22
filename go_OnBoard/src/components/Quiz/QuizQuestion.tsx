import { QuestionProps, UserActivitiesCollection } from "./ModelsQuizTypes";
import { useState, useEffect, useMemo } from "react";
import { AnswersContainer } from "./Answers.Container.styled";
import { Answer, ResultContainer } from "./Answers.styled";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "../../utils/firebase/firebase.config";
import { useUser } from "../RequireAuth/context/AuthContext";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";

export const QuestionCard = ({
  question,
  currentQuestion,
  lengthOfQuestions,
  setQuestionIndex,
  etapId,
  currentActivityId,
}: QuestionProps) => {
  const userName = useUser();
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [userResult, setUserResult] = useState<Number>(0);
  const [startQuiz, setStartQuiz] = useState<boolean>(true);
  const [saveQuizPoints, setSaveQuizPoints] = useState<boolean>(false);
  const [currentUserResult, setCurrentUserResult] = useState();
  const [quizEnded, setQuizEnded] = useState(false);

  const optionClicked = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < lengthOfQuestions) {
      setQuestionIndex(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizEnded(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setQuestionIndex(0);
    setShowResults(false);
    setSaveQuizPoints(false);
    setQuizEnded(false);
  };

  function startQuizFn() {
    setStartQuiz(false);
    setUserResult(0);
  }

  const quizResult = useMemo(() => {
    const result = (score / lengthOfQuestions) * 100;
    setUserResult(result);
    return result;
  }, [score, question.options.length]);

  const userQuizPointsCollection = collection(database, "user_quiz_points");
  const userActivitiesCollection =
    useFirebaseFetch<UserActivitiesCollection>("user_activities");
  const currentUserActivity = userActivitiesCollection.find(
    (currentId) => currentId?.user_activity_id === currentActivityId
  );

  useEffect(() => {
    if (quizEnded) {
      // check if there is already a document for a given user and stage
      const etapIdQuery = query(
        collection(database, "user_quiz_points"),
        where("etap_id", "==", etapId),
        where("user_id", "==", userName?.uid)
      );
      const unsubscribe = onSnapshot(etapIdQuery, (snapshot) => {
        if (snapshot.empty) {
          // if don't exist create new
          const newUserPoints = {
            etap_id: etapId,
            user_id: userName?.uid,
            result: userResult,
            save_quiz: false,
            user_activity_id: currentActivityId,
          };
          setDoc(doc(userQuizPointsCollection), newUserPoints)
            .then(() => {})
            .catch(() => console.log("Error"));
        } else {
          // if exist update the document
          const docId = snapshot.docs[0].id;
          updateDoc(doc(userQuizPointsCollection, docId), {
            result: userResult,
            save_quiz:
              currentUserActivity?.user_activity_id === currentActivityId
                ? true
                : null,
            user_activity_id: currentActivityId,
          })
            .then(() => {})
            .catch(() => console.log("Error"));
        }
      });
      return () => unsubscribe();
    } else {
      const etapIdQuery = query(
        userQuizPointsCollection,
        where("etap_id", "==", etapId),
        where("user_id", "==", userName?.uid)
      );
      const unsubscribe = onSnapshot(etapIdQuery, (snapshot) => {
        if (!snapshot.empty) {
          // if exist update the document
          const docId = snapshot.docs[0].id;
          const result = snapshot.docs[0].data().result;
          setCurrentUserResult(result);
        }
      });
      return () => unsubscribe();
    }
  }, [quizEnded]);

  return (
    <>
      {!startQuiz ? (
        <>
          {/* Current Score  */}
          <ResultContainer>
            <h4>Punkty: {score}</h4>
            <h4>
              Pytanie: {currentQuestion + 1} z {lengthOfQuestions}
            </h4>
          </ResultContainer>
          {/* Show results or show the question game  */}
          {showResults ? (
            <>
              <h4 style={{ display: "inline" }}>Wynik końcowy </h4>
              <h2 style={{ display: "inline" }}>{quizResult}</h2>
              <h5 style={{ display: "inline" }}>% </h5>
              {quizResult >= 75 ? (
                <div className="save-quiz">
                  {currentUserResult &&
                  currentUserResult < 75 &&
                  currentUserActivity?.user_activity_id ===
                    currentActivityId ? (
                    <p>
                      Brawo zaliczyłeś(aś) quiz. Przy poprzedniej próbie także
                      zaliczyłeś test i zapisałeś ten krok.
                    </p>
                  ) : (
                    <p>Brawo zaliczyłeś(aś) quiz.</p>
                  )}

                  <button onClick={() => restartQuiz()}>Powtórz quiz</button>
                </div>
              ) : (
                <div className="save-quiz">
                  {currentUserResult &&
                  currentUserResult < 75 &&
                  currentUserActivity?.user_activity_id ===
                    currentActivityId ? (
                    <p>
                      Niestety nie uzyskałeś(aś) minimalnych <b>75%</b> z quizu.
                      <br></br>
                      Natomiast przy poprzedniej próbie zaliczyłeś test oraz
                      zapisałeś krok.
                    </p>
                  ) : (
                    <p>
                      Niestety nie uzyskałeś(aś) minimalnych 75% z quizu. Aby
                      zapisać krok wykonaj test jeszcze raz.
                    </p>
                  )}

                  {/* <button onClick={() => saveQuiz()}>Zapisz wyniki quizu</button> */}
                  <button onClick={() => restartQuiz()}>Powtórz quiz</button>
                </div>
              )}
            </>
          ) : (
            <div className="question-card">
              <p>{question.text}</p>
              {/* List of possible answers  */}
              <AnswersContainer>
                {question.options.map((option) => {
                  return (
                    <Answer
                      key={option.id}
                      onClick={() => optionClicked(option.isCorrect)}>
                      {option.text}
                    </Answer>
                  );
                })}
              </AnswersContainer>
            </div>
          )}
        </>
      ) : (
        <div className="start-quiz">
          <p>
            {/* Witaj, poniżej znajduje się przycisk rozpoczynający quiz, klikając w niego zobaczysz pierwsze pytanie. Aby zaliczyć krok należy zdać test na minimum 75% oraz kliknąć przycisk "zapisz krok", powodzenia! */}
            {currentUserResult !== undefined ? (
              <p>
                Ostatni wynik Twojego quizu to{" "}
                {currentUserActivity?.user_activity_id === currentActivityId ? (
                  <>
                    {currentUserResult >= 75 ? (
                      <>
                        <strong>{`${currentUserResult}%`}</strong>
                        {`. Jeśli chcesz możesz wykonać quiz jeszcze raz, ale kliknąłeś juz przycisk "zapisz krok" więc tę aktywność masz juz zaliczoną!`}
                      </>
                    ) : (
                      <>
                        <strong>{`${currentUserResult}%`}</strong>
                        {`. Jeśli chcesz możesz wykonać quiz jeszcze raz, ale przy poprzednich próbach juz zaliczyłeś test i kliknąłeś przycisk "zapisz krok" więc tę aktywnosć masz juz zaliczoną!`}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {currentUserResult >= 75 ? (
                      <>{`${currentUserResult}%. Możesz kliknąć przycisk "zapisz krok" i zaliczyć aktywność. `}</>
                    ) : (
                      <>{`${currentUserResult}%. Wykonaj quiz jeszcze raz, aby zaliczyć ten krok.`}</>
                    )}
                  </>
                )}
              </p>
            ) : (
              <p></p>
            )}
          </p>
          <button onClick={() => startQuizFn()}>Rozpocznij quiz</button>
        </div>
      )}
    </>
  );
};
