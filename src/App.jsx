import "./App.css";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ForcastItem from "./components/forcastItem";
import DaysTemperatureItem from "./components/daysTemperatureItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function App() {
  const [forecastData, setForecastData] = useState();
  const [forecastDataRight, setForecastDataRight] = useState();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  function getLeftData() {
    const options = {
      method: "GET",
      url: "https://forecast9.p.rapidapi.com/rapidapi/forecast/Berlin/summary/",
      headers: {
        "X-RapidAPI-Key": "b49b5da320msh6a39a312a9e81b4p15fc0djsnc40f0c714df5",
        "X-RapidAPI-Host": "forecast9.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((res) => {
        setForecastData(res.data.forecast);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }
  function getRightData() {
    const options = {
      method: "GET",
      url: "https://forecast9.p.rapidapi.com/rapidapi/forecast/Berlin/hourly/",
      headers: {
        "X-RapidAPI-Key": "b49b5da320msh6a39a312a9e81b4p15fc0djsnc40f0c714df5",
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
                <h1>20º</h1>
                <p>Cloudy</p>
              </div>
              <div className="main-temp-right">
                <div className="inner-stats">
                  <AirIcon />
                  <p>6.1 mph</p>
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
            <h3>12:27 PM</h3>
            <div className="stats">
              <h2>20º</h2>
              <div>
                <div className="inner-stats">
                  <AirIcon />
                  <p>6.1 mph</p>
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
                    state={"Cloudy"}
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
