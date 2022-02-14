import {
  Chart,
  registerables,
  ChartData,
  CoreChartOptions,
  DatasetChartOptions,
  DoughnutControllerChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";
import React, { useEffect, useState } from "react";

import { createContext } from "react";

type chartProvider = {
  data: ChartData<"line", number[], string> | undefined;
  options?: _DeepPartialObject<
    | (CoreChartOptions<"line"> &
        ElementChartOptions<"line"> &
        PluginChartOptions<"line"> &
        DatasetChartOptions<"line"> &
        ScaleChartOptions<"line"> &
        DoughnutControllerChartOptions)
    | undefined
  >;
  // height?: string | number | undefined;
  // width?: string | number | undefined;
};

export const ChartContext = createContext({} as chartProvider);
export const ChartProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [data, setmyData] = useState<
    ChartData<"line", number[], string> | undefined
  >();
  const [options, setOptions] = useState({});

  useEffect(() => {
    console.log("ejecutando el useEffect");
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title
    );

    setmyData({
      // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          // label: "Estadisticas de los votos",
          data: [12, 19, 3, 5, 2, 3],
          type: "line",

          // backgroundColor: [
          //   "rgba(255, 99, 132, 0.2)",
          //   "rgba(54, 162, 235, 0.2)",
          //   "rgba(255, 206, 86, 0.2)",
          //   "rgba(75, 192, 192, 0.2)",
          //   "rgba(153, 102, 255, 0.2)",
          //   "rgba(255, 159, 64, 0.2)",
          // ],
          // borderColor: [
          //   "rgba(255, 99, 132, 1)",
          //   "rgba(54, 162, 235, 1)",
          //   "rgba(255, 206, 86, 1)",
          //   "rgba(75, 192, 192, 1)",
          //   "rgba(153, 102, 255, 1)",
          //   "rgba(255, 159, 64, 1)",
          // ],
          borderWidth: 1,
        },
      ],
    });
    setOptions({
      options: {
        plugins: {
          title: {
            display: true,
            text: "Chart Title",
          },
        },
        scales: {
          x: {
            type: "linear",
          },
          y: {
            type: "linear",
          },
        },
      },
    });

    console.log(data);
  }, []);
  return (
    <ChartContext.Provider value={{ data, options }}>
      {children}
    </ChartContext.Provider>
  );
};
