import { useState } from "react";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
}

export default function useFetch(url: string, options?: FetchOptions): any {
  const [data, setData] = useState<any[]>([]);
  const [status, setStatus] = useState<string>("");
  const [controller, setController] = useState<AbortController | null>(null);

  const startFetch = (body?: any): void => {
    setData([]);
    setStatus("loading");
    setController(null);

    fetchData(body);
  };

  const fetchData = async (body?: any): Promise<void> => {
    const abortController = new AbortController();
    setController(abortController);

    try {
      const response = await fetch(url, {
        method: options?.method || "GET",
        headers: options?.headers || { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
        signal: abortController.signal,
      });
      const json = await response.json();

      setData(json);
      setStatus("success");
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Cancelled request");
      } else {
        setStatus(error.message);
      }
    }
  };

  const handleCancelRequest = (): void => {
    if (controller) {
      controller.abort();
      setStatus("failed");
    }
  };

  return { data, status, handleCancelRequest, startFetch };
}
