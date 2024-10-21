async function getCountryFlags() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    const flags = {};
    countries.forEach(country => {
      const region = country.region;
      flags[region] = flags[region] || {};
      const code = country.cca2.toLowerCase();
      flags[region][code] = {
        name: country.name.common,
        flag: country.flag
      };
    });

    return flags;
  } catch (error) {
    console.error('Error fetching country flags:', error);
    return {};
  }
}

function createFlagButtons(flags) {
  const container = document.getElementById('flags-container');
  for (const [region, regionObject] of Object.entries(flags)) {
    //  <p> or <span> or <tr>
    for (const [code, codeObject] of Object.entries(regionObject)) {
      console.log(codeObject);
      const button = document.createElement('button');
      button.textContent = `${codeObject.flag}`;
      button.title = `${codeObject.name}`;
      button.onclick = () => copyToClipboard(codeObject.flag);
      // const span = document.createElement('span');
      // span.textContent = `${codeObject.name}`;
      container.appendChild(button);
    }
  }
}

function copyToClipboard(flagEmoji) {
  navigator.clipboard.writeText(flagEmoji).then(() => {
    console.log(`Copied: ${flagEmoji}`);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

getCountryFlags().then(flags => {
  createFlagButtons(flags);
});
