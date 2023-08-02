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
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
    subtitle: {
      display: true,
      text: 'Custom Chart Subtitle'
  }
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
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: spot_pricedata.map((item) => item.pricewithtax),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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

/*

      <p>
        {spot_pricedata.length > 0
          ? spot_pricedata[0].pricewithtax
          : "Loading..."}
      </p>


      {spot_pricedata?.map((item) => (
        <div key={item.rank}>
          <li key={item.rank}>{item.pricewithtax}</li>
        </div>
      ))}

*/

export default Spot_price;
