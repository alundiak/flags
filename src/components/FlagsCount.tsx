import './flagsCount.css'

// function renderCountryFlagsTotal(countryFlagsCount) {
//   const flagsTotal = document.getElementById('flags-count');
//   const spanElement = document.createElement('span');
//   spanElement.textContent = `${countryFlagsCount} country flags here:`;
//   flagsTotal.appendChild(spanElement);
// }

export function FlagsCount({ value }: { value: number }) {
  return (
    <>
      <h2 id="flags-count">
        <span>{value} country flags</span>
      </h2>
      <p></p>
    </>
  )
}
