import { baseUrl, options } from "./constants";

// MAYBE
export const searchByCountryCode = (
  allData: any,
  searchValue: string,
  callback: (d: any) => void,
) => {
  if (!allData.length) return;

  // IN API response ever country object has `cca2` field, which represents country 2-characters code, in UPPERCASE.
  // Example:
  // "cca2": "UA",
  // "ccn3": "804",
  // "cca3": "UKR",
  // "cioc": "UKR",

  const filteredData = allData.some((country: any) => {
    // return country.cca2 === searchValue.toUpperCase();
    return country.cca2.includes(searchValue.toUpperCase());
  });

  callback(filteredData);
};

// MAYBE
export const searchByCountryName = (
  allData: any,
  searchValue: string,
  callback: (d: any) => void,
) => {
  const filteredData = allData.some((country: any) => {
    return country.name.common
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  });

  callback(filteredData);
};

// GET ONLY UN members => /countries/v5?memberships.un=1
// GET ONLY non-UN members => /countries/v5?memberships.un=0

type Membership = {
  un: 1 | 0;
  eu: 1 | 0;
  nato: 1 | 0;
};

// It would be less efficient because of of requests limit, but it could be OK if needed ONLY UN/EU/NATO members
export async function getByMembership(un: 1 | 0) {
  const response = await fetch(`${baseUrl}?memberships.un=${un}`, options);
  const result = await response.json();
  return result;
}
