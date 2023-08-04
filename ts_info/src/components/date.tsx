import { useState, useEffect } from "react";

function Datetime() {
  const [date, setdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setdate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-container">
      <p> {date.toTimeString()}</p>
    </div>
  );
}

export default Datetime;
