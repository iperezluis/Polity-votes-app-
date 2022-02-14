import { Chart, registerables } from "chart.js";
import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { useBand } from "../hooks/useBand";
import { useGraphics } from "../hooks/useGraphics";

export const BandCharts = () => {
  const { socket } = useContext(SocketContext);
  const { createGraphics, myChart } = useGraphics();
  // const { bands, setBands } = useBand();

  useEffect(() => {
    socket.on("band-list-current", (bands) => {
      console.log(bands);
      createGraphics(bands);
      return () => myChart.destroy();
    });
  }, [socket]);

  return <canvas id="myChart"></canvas>;
};
