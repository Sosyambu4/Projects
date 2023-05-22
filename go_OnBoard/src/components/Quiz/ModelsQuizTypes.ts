export type Option = {
  id: number;
  text: string;
  isCorrect: boolean;
};
export type Question = {
  text: string;
  options: Option[];
};

export type QuestionesData = {
  questiones: Question[];
  etap_id: string;
};

export interface UsersActivitiesData {
  etap_id: string;
  user_id: string;
  user_activity_id: string;
}

export interface EtapIdProps {
  etapIdForQuiz: {
    activitiesId: string | null;
    etap_id: string;
    onActivityConfirmation: (newActivityId: string) => void;
  };
}

export interface QuestionProps {
  question: Question;
  currentQuestion: number;
  lengthOfQuestions: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  etapId: string;
  currentActivityId: string | null;
}

export interface UserActivitiesCollection {
  id: string;
  user_activity_id: string;
}
