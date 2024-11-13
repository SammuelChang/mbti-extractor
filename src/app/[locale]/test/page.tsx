"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

export default function Test() {
  const workerRef = useRef<Worker | null>(null);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../workers/sentiment.js", import.meta.url)
    );
    workerRef.current.onmessage = (event) => {
      if (event.data.status === "complete") {
        setResult(event.data);
      }
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const sendMessage = () => {
    workerRef.current?.postMessage(message);
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={sendMessage}>Send Message to Worker</Button>
      <div>{JSON.stringify(message)}</div>
      <div>{JSON.stringify(result)}</div>
    </div>
  );
}
