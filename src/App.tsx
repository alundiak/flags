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
import { MinimalFlagsData } from "./shared/models";

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
      country.name.common.toLowerCase().includes(lowerSearchValue),
    );
  }, [allData, searchValue]);

  // Split filtered countries by UN membership
  const { unCountriesData, notUNcountriesData } = useMemo(() => {
    const { unMembers, nonUnMembers } =
      extractFilteringByUnMember(filteredCountries);

    return {
      unCountriesData: composeCountryFlagsData(
        unMembers.sortByCountryCommonName(),
      ),
      notUNcountriesData: composeCountryFlagsData(
        nonUnMembers.sortByCountryCommonName(),
      ),
    };
  }, [filteredCountries]);

  const frequentCountries: MinimalFlagsData = useMemo(() => {
    const fav = ["UA", "PL", "LT", "FI", "RU", "BY", "SK"];

    const filtered = allData.filter((country: any) =>
      fav.includes(country.cca2),
    );

    return composeCountryFlagsData(filtered);
  }, [allData]);

  return (
    <>
      <h2>My Flags</h2>
      <p>
        A place where I can search emojis by country and copy to buffer upon
        click on flag
      </p>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <h3>Frequent</h3>
      <MainList data={frequentCountries} fav />
      <span>
        plus &nbsp;
        <span>
          England: <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span> &nbsp;
        </span>
        <span>
          Scotland: <span>🏴󠁧󠁢󠁳󠁣󠁴󠁿</span> &nbsp;
        </span>
      </span>

      <FlagsCount value={countriesCount} />
      <SearchField onInputHandler={(v) => setSearchValue(v)} />

      <div id="flags-container">
        <h3>UN members</h3>
        <MainList data={unCountriesData} />

        <h3>non-UN members</h3>
        <MainList data={notUNcountriesData} />
        <h3>not-approved states</h3>
        <ul>
          <li>
            England: <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
          </li>
          <li>
            Scotland: <span>🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
