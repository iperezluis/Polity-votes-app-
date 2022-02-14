import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { useBand } from "../hooks/useBand";
import { data } from "../hooks/useBand";

export const useGraphics = () => {
  const { bands, setBands } = useBand();
  const [myChart, setMyChart] = useState({});
  const createGraphics = (bands = []) => {
    // con esto removemos el canvas cada vez que lo llamemos
    // here we removes the canvas(graphics) for create again
    document.getElementById("myChart").remove();
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "myChart");
    canvas.setAttribute("width", "300");
    canvas.setAttribute("height", "100");
    document.querySelector("#chart").appendChild(canvas);

    const ctx = document.getElementById("myChart").getContext("2d");
    Chart.register(...registerables);

    setMyChart(
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: bands.map((band) => band.name),
          datasets: [
            {
              label: "# of Votes",
              data: bands.map((band) => {
                return band.votes;
              }),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          animation: false,
          // scales: {
          //   xAxes: {
          //     // type: "time",
          //     stacked: true,
          //   },
          // },
        },
      })
    );
  };
  return {
    myChart,
    setMyChart,
    createGraphics,
  };
};
