import React, { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

export interface data {
  id: number;
  name: string;
  votes: number;
}

export const useBand = () => {
  const [bands, setBands] = useState<data[]>([]);
  const { socket } = useSocket("http://localhost:3000");

  useEffect(() => {
    socket.on("band-list-current", (bands) => {
      console.log(bands);
      setBands([...bands]);
    });
    return () => {
      socket.off("band-list-current");
    };
  }, [socket]);

  return {
    bands,
    socket,
    setBands,
  };
};
