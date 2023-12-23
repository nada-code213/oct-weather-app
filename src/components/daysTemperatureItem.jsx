export default function DaysTemperatureItem({ heure, temperature, state }) {
  return (
    <div className="hourly-forcast-item" style={{ border: "none" }}>
      <h3>{heure}</h3>
      <h2>{temperature}</h2>
      <p>{state}</p>
    </div>
  );
}
