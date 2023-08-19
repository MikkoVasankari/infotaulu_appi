import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    y: {
      grid: { color: "#fff", lineWidth: 0.5 },
      ticks: { color: "#fff", beginAtZero: true },
    },
    x: {
      grid: {
        offset: false,
        borderColor: "grey",
        tickColor: "grey",
        drawTicks: true,
      },
      ticks: {display:true, color: "#fff", beginAtZero: true },
    },
  },

  datalabels: {
    display: true,
    color: "white",
    anchor: "end",
    labels: {
      title: {
        font: {
          weight: "bold",
          size: 18,
        },
      },
    },
  },

  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
    decimation: {
      enabled: false,
    },
  },
};

function Spot_price() {
  const [spot_pricedata, setspot_pricedata] = useState<spot_priceItem[]>([]);

  type spot_priceItem = {
    rank: number;
    datetime: string;
    pricenotax: number;
    pricewithtax: number;
  };

  async function fetchspot_pricedata() {
    const response = await fetch("http://localhost:42070/prices");

    const jsonData = await response.json();
    setspot_pricedata(jsonData);
  }

  useEffect(() => {
    fetchspot_pricedata();
  }, []);

  const labels = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const data = {
    labels,
    datasets: [
      { 
        label: "snt/kWh",
        data: spot_pricedata.map((item) =>
          (item.pricewithtax * 100).toFixed(2)
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        datalabels: {
          color: "white",
        },
      },
    ],
  };

  return (
    <div>
      <div className={"chart-container"}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default Spot_price;
