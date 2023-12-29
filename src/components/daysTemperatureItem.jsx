export default function DaysTemperatureItem({
  heure,
  temperature,
  state,
  selected,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="hourly-forcast-item"
      style={!selected ? { border: "none" } : null}
    >
      <h3>{heure}</h3>
      <h2>{temperature}</h2>
      <p>{state}</p>
    </div>
  );
}
