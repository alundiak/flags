export const baseUrl = "https://api.restcountries.com/countries/v5";

const API_KEY = import.meta.env.VITE_API_KEY || "";

export const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const favoritesCountries = ["UA", "PL", "LT", "FI", "RU", "BY", "SK"];
