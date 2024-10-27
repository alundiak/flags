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

Array.prototype.sortByCountryCommonName = function () {
  return this.sort((a, b) => {
    // Ensure that each element has the name.common property before comparing
    return a.name.common.localeCompare(b.name.common);
  });
};

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
  const mainContainer = document.getElementById('flags-container');

  const h3Element = document.createElement('h3');
  if (isUnMember) {
    h3Element.textContent = `${dataLength} UN members`;
  } else {
    h3Element.textContent = `${dataLength} non-UN members`;
  }
  mainContainer.appendChild(h3Element);

  const flagsBlockContainer = document.createElement('div');
  flagsBlockContainer.classList.add('flags-block-container');


  for (const [region, regionObject] of Object.entries(flagsData)) {
    for (const [code, codeObject] of Object.entries(regionObject)) {
      const divBlock = document.createElement('div');
      divBlock.className = 'flags-block';
      if (!isUnMember) {
        divBlock.classList.add('notUnMember');
      }

      const divFlag = document.createElement('div');
      divFlag.className = 'flag';

      const divCountry = document.createElement('div');
      divCountry.className = 'country';

      // vA
      divFlag.textContent = `${codeObject.flag}`;
      divFlag.title = `${codeObject.name}`;
      divCountry.textContent = `${codeObject.name}`;

      // vB
      // const keys = Object.keys(codeObject);
      // const flagEmoji = keys[0];
      // const countryName = codeObject[flagEmoji];
      // divFlag.textContent = `${flagEmoji}`;
      // divCountry.textContent = `${countryName}`;

      divFlag.onclick = () => copyToClipboard(codeObject);

      divBlock.appendChild(divFlag);
      divBlock.appendChild(divCountry);

      flagsBlockContainer.appendChild(divBlock);
    }
  }

  mainContainer.appendChild(flagsBlockContainer);
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
  // console.log(apiData);
  // console.log(JSON.stringify(apiData));

  renderCountryFlagsTotal(apiData.length);

  const { unMembers, nonUnMembers } = extractFilteringByUnMember(apiData);
  // console.log(unMembers);
  // console.log(nonUnMembers);

  const dataToRender1 = composeCountryFlagsData(unMembers.sortByCountryCommonName());
  const dataToRender2 = composeCountryFlagsData(nonUnMembers.sortByCountryCommonName());

  createFlagButtons(dataToRender1, true, unMembers.length);
  createFlagButtons(dataToRender2, false, nonUnMembers.length);
});
