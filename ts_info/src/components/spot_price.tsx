import { useState, useEffect } from "react";

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
  
  return (
    <div>
      <p>
      {spot_pricedata.length > 0 ? spot_pricedata[0].pricewithtax : "Loading..."}
      </p>
    </div>
  );
}

export default Spot_price;
