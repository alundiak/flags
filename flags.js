async function getRestCountriesFromApi() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error('Error fetching restcountries.com:', error);
    return {};
  }
}

function extractFilteringByUnMember(countriesApiData) {
  return countriesApiData.reduce((result, country) => {
    if (country.unMember) {
      result.unMembers.push(country);
    } else {
      result.nonUnMembers.push(country);
    }
    return result;
  }, { unMembers: [], nonUnMembers: [] });
}

function composeCountryFlagsData(countriesData) {
  const simplifiedData = {};
  countriesData.forEach(country => {
    const region = country.region;
    simplifiedData[region] = simplifiedData[region] || {};
    const code = country.cca2.toLowerCase();

    simplifiedData[region][code] = {
      // vA
      name: country.name.common,
      flag: country.flag,
      unMember: country.unMember // maybe not needed

      // vB
      // [country.flag]: country.name.common
    };
  });

  return simplifiedData;
}

function createFlagButtons(flagsData, isUnMember, dataLength) {
  const flagsContainer = document.getElementById('flags-container');
  const divElement1 = document.createElement('div');

  const h3Element = document.createElement('h3');
  if (isUnMember) {
    h3Element.textContent = `${dataLength} UN members`;
  } else {
    divElement1.classList.add('notUnMember');
    h3Element.textContent = `${dataLength} non-UN members`;
  }
  divElement1.appendChild(h3Element);


  for (const [region, regionObject] of Object.entries(flagsData)) {
    //  <p> or <span> or <tr>
    for (const [code, codeObject] of Object.entries(regionObject)) {
      const spanElement = document.createElement('span');

      // vA
      spanElement.textContent = `${codeObject.flag}`;
      spanElement.title = `${codeObject.name}`;

      // vB
      // const keys = Object.keys(codeObject);
      // const flagEmoji = keys[0];
      // const countryName = codeObject[flagEmoji];
      // spanElement.textContent = `${flagEmoji}`;
      // spanElement.title = `${countryName}`;

      spanElement.onclick = () => copyToClipboard(codeObject);

      divElement1.appendChild(spanElement);
    }
  }

  flagsContainer.appendChild(divElement1);

  // experimental
  const divElement2 = document.createElement('div');
  flagsContainer.appendChild(divElement2);
}

function renderCountryFlagsTotal(countryFlagsCount) {
  const flagsTotal = document.getElementById('flags-count');
  const spanElement = document.createElement('span');
  spanElement.textContent = `${countryFlagsCount} country flags here:`;
  flagsTotal.appendChild(spanElement);
}

function copyToClipboard(codeObject) {
  // vA
  const flagEmoji = codeObject.flag;
  const countryName = codeObject.name;

  // vB
  // const keys = Object.keys(codeObject);
  // const flagEmoji = keys[0];
  // const countryName = codeObject[flagEmoji];

  navigator.clipboard.writeText(flagEmoji).then(() => {
    // console.log(`Copied: ${flagEmoji}`);
    showToast(`Copied: ${flagEmoji} ${countryName}`);
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

getRestCountriesFromApi().then(apiData => {
  console.log(apiData);
  // console.log(JSON.stringify(apiData));

  renderCountryFlagsTotal(apiData.length);

  const { unMembers, nonUnMembers } = extractFilteringByUnMember(apiData);
  console.log(unMembers);
  console.log(nonUnMembers);

  const dataToRender1 = composeCountryFlagsData(unMembers);
  const dataToRender2 = composeCountryFlagsData(nonUnMembers);

  createFlagButtons(dataToRender1, true, unMembers.length);
  createFlagButtons(dataToRender2, false, nonUnMembers.length);
});
