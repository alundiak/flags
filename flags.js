async function getCountryFlags() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    const composedFlagsData = {};
    countries.forEach(country => {
      const region = country.region;
      composedFlagsData[region] = composedFlagsData[region] || {};
      const code = country.cca2.toLowerCase();
      composedFlagsData[region][code] = {
        // vA
        // name: country.name.common,
        // flag: country.flag

        // vB
        [country.flag]: country.name.common
      };
    });

    return composedFlagsData;
  } catch (error) {
    console.error('Error fetching country flags:', error);
    return {};
  }
}

function createFlagButtons(flagsData) {
  const container = document.getElementById('flags-container');
  for (const [region, regionObject] of Object.entries(flagsData)) {
    //  <p> or <span> or <tr>
    for (const [code, codeObject] of Object.entries(regionObject)) {
      const spanElement = document.createElement('span');

      // vA
      // spanElement.textContent = `${codeObject.flag}`;
      // spanElement.title = `${codeObject.name}`;

      // vB
      const keys = Object.keys(codeObject);
      const flagEmoji = keys[0];
      const countryName = codeObject[flagEmoji];
      spanElement.textContent = `${flagEmoji}`;
      spanElement.title = `${countryName}`;

      spanElement.onclick = () => copyToClipboard(codeObject);

      container.appendChild(spanElement);
    }
  }
}

function copyToClipboard(codeObject) {
  navigator.clipboard.writeText(codeObject.flag).then(() => {
    // console.log(`Copied: ${flagEmoji}`);
    showToast(`Copied: ${codeObject.flag} ${codeObject.name}`);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }, 2000);
}

getCountryFlags().then(flagsFromApi => {
  // console.log(JSON.stringify(flagsFromApi));
  createFlagButtons(flagsFromApi);
});
