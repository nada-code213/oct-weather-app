import { useEffect, useState } from "react";

export default function CurrentTime() {
  const [time, setTime] = useState(
    new Date().getHours() + ":" + new Date().getMinutes()
  );
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().getHours() + ":" + new Date().getMinutes());
    }, 60000);
  }, []);
  return <h3>{time}</h3>;
}
