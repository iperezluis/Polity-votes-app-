import React, { useState, useEffect, useRef, useContext } from "react";

import BandAdd from "./components/BandAdd";
import BandList from "./components/BandList";
import { SocketContext } from "./context/SocketContext";
import { useBand } from "./hooks/useBand";
import { useSocket } from "./hooks/useSocket";
// import { BandChart } from "./components/BandChart";
import { BandCharts } from "./components/BandCharts";
import {
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  registerables,
  Title,
} from "chart.js";
import { useGraphics } from "./hooks/useGraphics";

Chart.register(...registerables);

const HomePage = () => {
  const { bands, setBands } = useBand();
  // const isMounted = useRef<boolean>();
  const { socket, onLine } = useContext(SocketContext);
  const { createGraphics } = useGraphics();

  useEffect(() => {
    socket.on("band-list-current", (bands) => {
      console.log(bands);
      setBands([...bands]);
      //si el bandList fuera ser destruido vamos a ejecutar el return para que ya no este pendiente el listener del evento
    });
    return () => {
      socket.off("band-list-current");
    };
  }, [socket]);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {onLine ? (
            <span className="text-success"> onLine</span>
          ) : (
            <span className="text-danger"> offLine</span>
          )}
        </p>
        <h1>BandNames</h1>
        <div className="row" id="chart">
          <div className="col">
            <BandCharts />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-8">
            <BandList data={bands} />
          </div>
          <div className="col-4">
            <BandAdd title="Agregar nueva banda" />
          </div>
        </div>
        {/* <div className="">{JSON.stringify(bands, null, 4)}</div> */}
      </div>
    </div>
  );
};

export default HomePage;
