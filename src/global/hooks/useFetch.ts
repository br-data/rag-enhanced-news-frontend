import { useState } from "react";

interface FetchOptions extends RequestInit {
  body?: any;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  executeFetch: () => void;
}

const useFetch = <T>(url: string, options: FetchOptions): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const executeFetch = async () => {
    setLoading(true);
    try {
      const fetchOptions: FetchOptions = { ...options };

      if (fetchOptions.body && typeof fetchOptions.body === "object") {
        fetchOptions.body = JSON.stringify(fetchOptions.body);
        fetchOptions.headers = {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        };
      }

      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json: T = await response.json();
      setData(json);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, executeFetch };
};

export default useFetch;
