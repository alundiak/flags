import { useEffect, useMemo, useState } from "react";
import {
  composeCountryFlagsData,
  extractFilteringByUnMember,
  getRestCountriesFromApi,
} from "./shared/helpers";
import { favoritesCountries } from "./shared/constants";
import { MinimalFlagsData } from "./shared/models";
import { SearchField } from "./components/SearchField";
import { MainList } from "./components/MainList";
import { FlagsCount } from "./components/FlagsCount";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

let didInit = false;

// NOT USED
export function AppDynamic() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState([]);
  // MAYBE
  // const [unCountriesData, setUNcountriesData] = useState<MinimalFlagsData>({});
  // const [notUNcountriesData, setNotUNcountriesData] = useState<MinimalFlagsData>({});

  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    // TBD in July-2026
    console.log("useEffect() 1");

    if (!didInit) {
      didInit = true;

      getRestCountriesFromApi()
        .then(({ data }) => {
          setAllData(data.objects);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  // Filter countries based on search value
  const filteredCountries = useMemo(() => {
    // console.log('useMemo() 1');
    if (!searchValue) return allData;

    const lowerSearchValue = searchValue.toLowerCase();

    return allData.filter((obj: any) =>
      obj.names.common.toLowerCase().includes(lowerSearchValue),
    );
  }, [allData, searchValue]);

  // Split filtered countries by UN membership
  const { unCountriesData, notUNcountriesData } = useMemo(() => {
    if (!filteredCountries.length) {
      return {
        unCountriesData: {} as MinimalFlagsData,
        notUNcountriesData: {} as MinimalFlagsData,
      };
    }

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
    // if (!allData.length) {
    //   return {} as MinimalFlagsData;
    // }
    const filtered = allData.filter(
      (obj: any) => favoritesCountries.includes(obj.codes.alpha_2), // in UPPERCASE already
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
      {/* <span>
        plus &nbsp;
        <span>
          England: <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span> &nbsp;
        </span>
        <span>
          Scotland: <span>🏴󠁧󠁢󠁳󠁣󠁴󠁿</span> &nbsp;
        </span>
      </span> */}

      <FlagsCount value={allData.length} />
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
