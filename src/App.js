import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();

    const countdownMs =
      new Date(`01-14-${year}`).getTime() - new Date().getTime();

    let timeLeft = {};

    if (countdownMs > 0) {
      timeLeft = {
        days: Math.floor(countdownMs / (1000 * 60 * 60 * 24)),
        hours: Math.floor((countdownMs / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((countdownMs / 1000 / 60) % 60),
        seconds: Math.floor((countdownMs / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [birthday, setBirthday] = useState();

  const textBirthday = (
    <div className="birthday">
      <span>Happy birthday to you!</span>
    </div>
  );

  useEffect(() => {
    if (timeLeft) {
      setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }

    setTimeout(() => {
      setBirthday(textBirthday);
    }, 2000);
  }, [timeLeft]);

  const timerComponents = [];

  Object.keys(timeLeft).map((interval, index) => {
    if (!timeLeft[interval]) return null;

    timerComponents.push(
      <div className="countdown" key={index}>
        <span className="timeleft">{timeLeft[interval]}</span>
        <span className="interval">{interval}</span>
      </div>
    );
  });

  return (
    <div className="container">
      {timerComponents.length ? timerComponents : birthday}
    </div>
  );
}

export default App;
