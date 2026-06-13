import "./flagsCount.css";

export function FlagsCount({ value }: { value: number }) {
  return (
    <>
      <h2 id="flags-count">
        <span>{value} country flags</span>
      </h2>
      <p></p>
    </>
  );
}
