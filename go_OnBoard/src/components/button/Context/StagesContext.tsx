import { createContext, useContext } from "react";

export interface StagesContextValue {
  etapId: string | null;
  handleActivityConfirmation: (newActivityId: string) => void;
}

export const StagesContext = createContext<StagesContextValue | null>(null);

export const useStages = () => {
  const value = useContext(StagesContext);
  if (value === null) {
    throw new Error("useStages has to be use within StagesContext");
  }
  return value;
};
