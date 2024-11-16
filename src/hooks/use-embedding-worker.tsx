"use client";

import { useEffect, useRef, useState } from "react";

interface Embedding {
  array: any[];
  pathParam: string;
}

interface WorkerResult {
  status: string;
  [key: string]: any;
}

type WorkerStatus =
  | "idle"
  | "initializing"
  | "ready"
  | "processing"
  | "complete"
  | "error";

export const useEmbeddingWorker = () => {
  const workerRef = useRef<Worker | null>(null);
  const [result, setResult] = useState<WorkerResult | null>(null);
  const [workerStatus, setWorkerStatus] = useState<WorkerStatus>("idle");

  useEffect(() => {
    try {
      setWorkerStatus("initializing");
      workerRef.current = new Worker(
        new URL("@/app/workers/embedding.js", import.meta.url) // '@/app/workers' || '../app/workers'
      );

      workerRef.current.onmessage = (event) => {
        if (event.data.status === "complete") {
          setResult(event.data);
          // 當收到完成消息時，將狀態設為 complete
          setWorkerStatus("complete");
          // 短暫延遲後重置為 ready 狀態，準備接收下一個任務
          setTimeout(() => {
            setWorkerStatus("ready");
          }, 1500);
        }
      };

      workerRef.current.onerror = () => {
        setWorkerStatus("error");
      };

      setWorkerStatus("ready");

      return () => {
        workerRef.current?.terminate();
        setWorkerStatus("idle");
      };
    } catch (error) {
      setWorkerStatus("error");
      console.error("Worker initialization failed:", error);
    }
  }, []);

  const sendMessage = (data: Embedding) => {
    if (workerRef.current && workerStatus === "ready") {
      setWorkerStatus("processing");
      workerRef.current.postMessage(data);
    }
  };

  return {
    result,
    sendMessage,
    workerStatus,
  };
};

// pages/Test
