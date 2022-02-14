import React from "react";
import { SocketProvider } from "./context/SocketContext";
import HomePage from "./App";
import { ChartProvider } from "./context/ChartContext";

export default function BandNames() {
  return (
    <SocketProvider>
      <ChartProvider>
        <HomePage />
      </ChartProvider>
    </SocketProvider>
  );
}
