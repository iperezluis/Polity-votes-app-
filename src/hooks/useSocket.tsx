import React, { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

export const useSocket = (url: string) => {
  const [onLine, setOnLine] = useState<boolean>(false);

  //aqui nos conectamos con el frontEnd
  // const socket= io('http://localhost:3000', { autoConnect: true})
  // Ahora agregamos useMemo para que guarde en memoria le socket cuando cambie la url
  const socket = useMemo(
    () =>
      io(url, {
        // transports: ["websockets"],<-- esto era lo que no dejaba conectarme
        autoConnect: true,
      }),
    [url]
  );

  useEffect(() => {
    socket.on("connect", () => setOnLine(true));
    console.log("clinet conectado");
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => setOnLine(false));
  }, [socket]);

  return {
    socket,
    onLine,
  };
};
