export default function ForcastItem({ heure, temperature, state }) {
  return (
    <div className="hourly-forcast-item">
      <h3>{heure}</h3>
      <h2>{temperature}</h2>
      <p>{state}</p>
    </div>
  );
}
