"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSentimentWorker } from "@/hooks/use-sentiment-worker";
import { useState } from "react";

const getStatusMessage = (workerStatus: string) => {
  switch (workerStatus) {
    case "idle":
      return "Worker not started";
    case "initializing":
      return "Initializing worker...";
    case "ready":
      return "Worker ready";
    case "processing":
      return "Processing message...";
    case "complete":
      return "Processing complete!";
    case "error":
      return "Worker error";
    default:
      return "Unknown status";
  }
};

const getStatusColor = (workerStatus: string) => {
  switch (workerStatus) {
    case "complete":
      return "text-green-500";
    case "error":
      return "text-red-500";
    case "processing":
      return "text-yellow-500";
    default:
      return "text-gray-500";
  }
};

export default function Test() {
  const [message, setMessage] = useState("");
  const { result, sendMessage, workerStatus } = useSentimentWorker();

  const handleSendMessage = () => {
    sendMessage(message);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className={`text-sm ${getStatusColor(workerStatus)}`}>
        Status: {getStatusMessage(workerStatus)}
      </div>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={workerStatus === "processing"}
      />
      <Button
        onClick={handleSendMessage}
        disabled={workerStatus === "processing" || workerStatus === "error"}
      >
        Send Message to Worker
      </Button>
      <div>{JSON.stringify(message)}</div>
      <div>{JSON.stringify(result)}</div>
    </div>
  );
}
