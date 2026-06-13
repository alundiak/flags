import { useMemo, useState } from "react";
import {
  composeCountryFlagsData,
  extractFilteringByUnMember,
} from "./shared/helpers";
import { favoritesCountries } from "./shared/constants";
import { MinimalFlagsData } from "./shared/models";
import { SearchField } from "./components/SearchField";
import { MainList } from "./components/MainList";
import { FlagsCount } from "./components/FlagsCount";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import tempData from "./data/data-2026.json";
const allData = tempData.data.objects;

export function AppStatic() {
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredCountries = useMemo(() => {
    if (!searchValue) return allData;

    const lowerSearchValue = searchValue.toLowerCase();

    return allData.filter((obj: any) =>
      obj.names.common.toLowerCase().includes(lowerSearchValue),
    );
  }, [searchValue]);

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

      <h3>Frequent</h3>
      <MainList data={frequentCountries} fav />

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
