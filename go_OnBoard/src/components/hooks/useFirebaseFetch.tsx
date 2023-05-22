import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../utils/firebase/firebase.config";

type Data<T> = {
  id: string;
} & T;

export const useFirebaseFetch = <T,>(collectionName: string): Data<T>[] => {
  const [data, setData] = useState<Data<T>[]>([]);

  const dataCollection = useMemo(() => collection(database, collectionName), [collectionName]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(dataCollection);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Data<T>[];
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [collectionName]);
  return data;
};
