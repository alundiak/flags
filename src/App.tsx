import { useEffect, useMemo, useState } from "react";
import {
  composeCountryFlagsData,
  extractFilteringByUnMember,
  getRestCountriesFromApi,
} from "./shared/helpers";
import { SearchField } from "./components/SearchField";
import { MainList } from "./components/MainList";
import { FlagsCount } from "./components/FlagsCount";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState([]);
  const [countriesCount, setCountriesCount] = useState(0);
  // MAYBE
  // const [unCountriesData, setUNcountriesData] = useState<MinimalFlagsData>({});
  // const [notUNcountriesData, setNotUNcountriesData] = useState<MinimalFlagsData>({});

  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    // console.log('useEffect() 1');
    const fetchData = async () => {
      getRestCountriesFromApi()
        .then((apiData) => {
          setLoading(true);
          setAllData(apiData);
          setCountriesCount(apiData.length);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  // Filter countries based on search value
  const filteredCountries = useMemo(() => {
    // console.log('useMemo() 1');
    if (!searchValue) return allData;

    const lowerSearchValue = searchValue.toLowerCase();

    return allData.filter((country: any) =>
      country.name.common.toLowerCase().includes(lowerSearchValue)
    );
  }, [allData, searchValue]);

  // Split filtered countries by UN membership
  const { unCountriesData, notUNcountriesData } = useMemo(() => {
    // console.log("useMemo() 2");
    const { unMembers, nonUnMembers } =
      extractFilteringByUnMember(filteredCountries);
    return {
      unCountriesData: composeCountryFlagsData(
        unMembers.sortByCountryCommonName()
      ),
      notUNcountriesData: composeCountryFlagsData(
        nonUnMembers.sortByCountryCommonName()
      ),
    };
  }, [filteredCountries]);

  return (
    <>
      <h2>My Flags</h2>
      <p>
        A place where I can search emojis by country and copy to buffer upon
        click on flag
      </p>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <FlagsCount value={countriesCount} />
      <SearchField onInputHandler={(v) => setSearchValue(v)} />

      <div id="flags-container">
        <h3>UN members</h3>
        <MainList data={unCountriesData} />
        <h3>non-UN members</h3>
        <MainList data={notUNcountriesData} />
      </div>
    </>
  );
}

export default App;
