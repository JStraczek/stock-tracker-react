import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./Chart.css";
import { iex } from "./tokens.js";

const baseurl = "https://cloud.iexapis.com/stable";
const apitoken = iex.api_token;

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
  responsive: true,
};

function Chart({ focusedStock, className }) {
  const [data, setData] = useState({});

  const buildChartData = (data) => {
    let chartData = [];
    data.map((entry) => {
      const newDataPoint = {
        x: entry.date,
        y: entry.open,
      };
      chartData.push(newDataPoint);
    });
    console.log(chartData);
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${baseurl}/stock/${focusedStock}/chart/1m?token=${apitoken}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const chartData = buildChartData(data);
          setData(chartData);
        });
    };
    fetchData();
  }, [focusedStock]);

  return (
    <div className="chart">
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default Chart;
