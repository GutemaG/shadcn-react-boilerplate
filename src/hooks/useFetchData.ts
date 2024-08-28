import { useState, useEffect } from "react";

type UseFetchDataResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetchData<T>(
  fetchDataFn: () => Promise<T>
): UseFetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataFn();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchDataFn]);

  return { data, loading, error };
}
