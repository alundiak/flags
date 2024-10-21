// https://dev.to/jorik/country-code-to-flag-emoji-a21
// https://jsfiddle.net/link2twenty/c0m4ze5d/
// const getFlagEmoji = countryCode => String.fromCodePoint(...[...countryCode.toUpperCase()].map(x => 0x1f1a5 + x.charCodeAt()))
// console.log(getFlagEmoji('UK'));

// function getFlagEmoji(countryCode) {
//   return countryCode.toUpperCase().replace(/./g, char =>
//     String.fromCodePoint(127397 + char.charCodeAt())
//   );
// }
// console.log(getFlagEmoji('UK'));

// const getFlagEmoji = (countryCode) =>
//   countryCode.toUpperCase().replace(/./g,
//     char => String.fromCodePoint(127397 + char.charCodeAt())
//   );

// const a = "US".forEach(s => s.innerHTML = getFlagEmoji(s.dataset.flag))
// console.log(a);


// https://dev.to/ionbazan/turn-a-country-code-into-an-emoji-flag-us--360a

function country2flag(countryCode) {
  return countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(char.charCodeAt(0) + 0x1F1A5))
    .join('');
}

console.log(country2flag('pl')); // 🇵🇱
console.log(country2flag('JP')); // 🇯🇵
console.log(country2flag('us')); // 🇺🇸
console.log(country2flag('EU')); // 🇪🇺



