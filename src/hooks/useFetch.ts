import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Fetch data from an endpoint
 * @param path path to the endpoint
 * @returns
 */
export function useFetch<T>(path: string): {
  loading: boolean;
  result: T | null;
  error: string;
  retry: () => Promise<void>;
} {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<T | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const getData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch(path, { signal: controller.signal });
      const data = (await response.json()) as {
        success?: boolean;
        result?: T;
        error?: string;
      };

      if (!response.ok || !data.success || !data.result) {
        throw new Error(data.error || "Couldn't get data");
      }

      setResult(data.result);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }

      let message = "Network Error";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, [path]);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    getData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [getData]);

  return {
    loading,
    result,
    error,
    retry: getData,
  };
}
