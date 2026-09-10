import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./pricechart.module.css";

const ApexChart = ({ fromCity, toCity }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Price",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      labels: [],
      xaxis: {
        type: "datetime",
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#7C8DB0",
            fontSize: "18px",
          },
        },
      },
      legend: {
        horizontalAlign: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          type: "vertical",
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 32.81, 100],
          colorStops: [
            { offset: 0, color: "#D2D1FA" },
            { offset: 32.81, color: "#C3C2F8" },
            { offset: 100, color: "#A5A4F4" },
          ],
        },
      },
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!fromCity || !toCity) return;

    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/price-history?fromCity=${encodeURIComponent(fromCity)}&toCity=${encodeURIComponent(toCity)}`);
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error);

        const prices = data.map(item => item.price);
        const dates = data.map(item => item.date);

        setChartData(prev => ({
          ...prev,
          series: [{ name: "Price", data: prices }],
          options: {
            ...prev.options,
            labels: dates
          }
        }));
      } catch (err) {
        console.error("Failed to fetch price history", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [fromCity, toCity]);

  return (
    <div className={styles.container}>
      <div className={styles.pricesheader}>
        <h4>Price history</h4>
      </div>
      <div className={styles.chartcontainer}>
        <div id="chart">
          {!isLoading && (
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="area"
              height={200}
            />
          )}
          {isLoading && <p>Loading chart...</p>}
        </div>
      </div>
    </div>
  );
};

export default ApexChart;
