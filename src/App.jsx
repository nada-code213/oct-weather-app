import "./App.css";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ForcastItem from "./components/forcastItem";
import DaysTemperatureItem from "./components/daysTemperatureItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import CurrentTime from "./components/currentTime";

function App() {
  const [forecastData, setForecastData] = useState();
  const [forecastDataRight, setForecastDataRight] = useState();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [selectedDate, setSelectedDate] = useState();

  const [time, setTime] = useState(new Date().getTime());
  function getLeftData() {
    const options = {
      method: "GET",
      url: "https://forecast9.p.rapidapi.com/rapidapi/forecast/Algiers/summary/",
      headers: {
        "X-RapidAPI-Key": "c975bf37b4msh1f233832d20478bp12b97bjsn747e557d11d9",
        "X-RapidAPI-Host": "forecast9.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((res) => {
        setForecastData(res.data.forecast);
        setSelectedDate(res.data.forecast.items[0]);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }
  function getRightData() {
    const options = {
      method: "GET",
      url: "https://forecast9.p.rapidapi.com/rapidapi/forecast/Algiers/hourly/",
      headers: {
        "X-RapidAPI-Key": "c975bf37b4msh1f233832d20478bp12b97bjsn747e557d11d9",
        "X-RapidAPI-Host": "forecast9.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setForecastDataRight(res.data.forecast);
      })
      .catch(() => {})
      .finally(() => {
        setLoading2(false);
      });
  }

  useEffect(() => {
    getLeftData();
    getRightData();
  }, []);

  return (
    <main>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="left">
            <div className="header">
              <h1>Multan</h1>
              <h2>21.04.2021</h2>
            </div>
            <div className="main-temperature">
              <div className="main-temp-left">
                <h1>
                  {(selectedDate.temperature.min +
                    selectedDate.temperature.max) /
                    2 +
                    "º"}
                </h1>
                <p>Cloudy</p>
              </div>
              <div className="main-temp-right">
                <div className="inner-stats">
                  <AirIcon />
                  <p>
                    {(selectedDate.wind.min + selectedDate.wind.max) / 2 +
                      selectedDate.wind.unit}
                  </p>
                </div>
                <div className="inner-stats">
                  <WaterDropIcon />
                  <p>90%</p>
                </div>
              </div>
            </div>
            <div className="days-temperature">
              {forecastData.items.slice(0, 6).map((e) => {
                return (
                  <DaysTemperatureItem
                    key={e.date}
                    heure={"12 PM"}
                    state={e.date}
                    temperature={`${
                      (e.temperature.min + e.temperature.max) / 2
                    }º`}
                    selected={e.date === selectedDate.date}
                    onClick={() => {
                      setSelectedDate(e);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
      {loading2 ? (
        <CircularProgress />
      ) : (
        <div className="right">
          <div className="main-right">
            <h2 className="greeting">Good Morning</h2>
            <CurrentTime />
            <div className="stats">
              <h2>
                {(forecastData.items[0].temperature.min +
                  forecastData.items[0].temperature.max) /
                  2}
              </h2>
              <div>
                <div className="inner-stats">
                  <AirIcon />
                  <p>
                    {(forecastData.items[0].wind.min +
                      forecastData.items[0].wind.max) /
                      2 +
                      forecastData.items[0].wind.unit}
                  </p>
                </div>
                <div className="inner-stats">
                  <WaterDropIcon />
                  <p>90%</p>
                </div>
              </div>
            </div>
            <h3>Feels like 19º</h3>
            <h2>Cloudy</h2>
          </div>
          <div className="hourly-forcast">
            <h2>Hourly Forcast</h2>
            <div className="hourly-forcast-content">
              {forecastDataRight.items.slice(0, 6).map((e) => {
                return (
                  <ForcastItem
                    key={e.date}
                    heure={`${new Date(e.date).getHours()}h`}
                    state={e.weather.text}
                    temperature={e.temperature.avg + " º"}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
