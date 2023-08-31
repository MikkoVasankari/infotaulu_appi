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

  let labels:string[] = [];
  for (let item in spot_pricedata) {
    labels.push(spot_pricedata[item].datetime.slice(11,16))
  }
  
  const data = {
    labels,
    datasets: [
      { 
        label: "snt/kWh",
        data: spot_pricedata.map((item) =>
          (item.pricewithtax * 100).toFixed(1)
        ),
        borderWidth: 0.75,
        borderColor: "rgba(255, 255, 255, 0.4)",
        backgroundColor: "rgba(82, 82, 82, 0.2)",
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
