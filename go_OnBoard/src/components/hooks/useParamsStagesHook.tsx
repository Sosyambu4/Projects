import { useParams } from "react-router-dom";

export function useParamsStagesHook(): string | null {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    console.warn("etapsid pusty");
    return null;
  }
  return id;
}
