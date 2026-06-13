export const baseUrl = "https://api.restcountries.com/countries/v5";

const API_KEY = import.meta.env.VITE_API_KEY || "";

export const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const favoritesCountries = ["UA", "PL", "LT", "FI", "RU", "BY", "SK"];

const orderMap = new Map(
  favoritesCountries.map((code, index) => [code, index]),
);

export const sortByCodeIndex = <T>(data: T[]) => {
  return data.sort((a: any, b: any) => {
    const aCodeIndex = orderMap.get(a.codes.alpha_2) ?? Infinity;
    const bCodeIndex = orderMap.get(b.codes.alpha_2) ?? Infinity;
    return aCodeIndex - bCodeIndex;
  });
};
