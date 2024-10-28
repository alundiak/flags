import { CodeObject, MinimalFlagsData } from "./models";

// @ts-expect-error
Array.prototype.sortByCountryCommonName = function () {
  return this.sort((a: any, b: any) => {
    // Ensure that each element has the name.common property before comparing
    return a.name.common.localeCompare(b.name.common);
  });
};

export async function getRestCountriesFromApi() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error('Error fetching restcountries.com:', error);
    return {};
  }
}

export function composeCountryFlagsData(countriesData: any): MinimalFlagsData {
  const simplifiedData: MinimalFlagsData = {};

  countriesData.forEach((country: any) => {
    const region = country.region;
    simplifiedData[region] = simplifiedData[region] || {};
    const code = country.cca2.toLowerCase();

    simplifiedData[region][code] = {
      flag: country.flag,
      code,
      name: country.name.common,
      unMember: country.unMember
    };
  });

  return simplifiedData;
}

export function extractFilteringByUnMember(countriesApiData: any) {
  return countriesApiData.reduce((result: any, country: any) => {
    if (country.unMember) {
      result.unMembers.push(country);
    } else {
      result.nonUnMembers.push(country);
    }
    return result;
  }, { unMembers: [], nonUnMembers: [] });
}

// MAYBE
export const searchByCountryCode = (allData: any, searchValue: string, callback: (d: any) => void) => {
  if (!allData.length) return;

  // IN API response ever country object has `cca2` field, which represents country 2-characters code, in UPPERCASE.
  // Example:
  // "cca2": "UA",
  // "ccn3": "804",
  // "cca3": "UKR",
  // "cioc": "UKR",

  const filteredData = allData.some((country: any) => {
    // return country.cca2 === searchValue.toUpperCase();
    return country.cca2.includes(searchValue.toUpperCase())
  });

  callback(filteredData);
}

// MAYBE
export const searchByCountryName = (allData: any, searchValue: string, callback: (d: any) => void) => {
  const filteredData = allData.some((country: any) => {
    return country.name.common.toLowerCase().includes(searchValue.toLowerCase());
  });

  callback(filteredData);
}

function showToast(message: string) {
  const toast = document.createElement('div');
  toast.className = 'my-toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }, 2000);
}

// @ts-expect-error
function copyToClipboardBasic(str: string, callback: () => void) {
  navigator.clipboard.writeText(str).then(() => {
    callback();
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

async function copyToClipboardSimplified(str: string, callback: () => void) {
  await navigator.clipboard.writeText(str)
  callback();
}

// @ts-expect-error
function copyToClipboardWithWorkaround(str: string, callback: () => void) {
  // When DevTools is opened, and JavaScript code is debugged, then copying causes and error in code:
  // "NotAllowedError: Failed to execute 'writeText' on 'Clipboard': Document is not focused."
  // Workaround actually doesn't work, but Copying WORKS OK when DevTools is CLOSED.
  // https://stackoverflow.com/questions/56306153/domexception-on-calling-navigator-clipboard-readtext
  setTimeout(async () => {
    await navigator.clipboard.writeText(str).then(() => {
      callback();
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }, 0);
}

export function copyToClipboard(codeObject: CodeObject) {
  const flagEmoji = codeObject.flag;
  const countryName = codeObject.name;

  const callback = () => {
    showToast(`Copied: ${flagEmoji} ${countryName}`);
  }

  // copyToClipboardBasic(flagEmoji, callback);
  copyToClipboardSimplified(flagEmoji, callback);
  // copyToClipboardWithWorkaround(flagEmoji, callback);
}
