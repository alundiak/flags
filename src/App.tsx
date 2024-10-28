import { useEffect, useMemo, useState } from 'react';
import { composeCountryFlagsData, extractFilteringByUnMember, getRestCountriesFromApi } from './shared/helpers';
import { MinimalFlagsData } from './shared/models';
import { SearchField } from './components/SearchField'
import { MainList } from './components/MainList'
import { FlagsCount } from './components/FlagsCount';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState([]);
  const [cachedAllData, setCachedAllData] = useState([]);
  const [countriesCount, setCountriesCount] = useState(0);
  // MAYBE
  // const [unCountriesData, setUNcountriesData] = useState<MinimalFlagsData>({});
  // const [notUNcountriesData, setNotUNcountriesData] = useState<MinimalFlagsData>({});

  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    console.log('useEffect() 1');
    const fetchData = async () => {
      getRestCountriesFromApi().then((apiData) => {
        setLoading(true);
        setAllData(apiData);
        setCachedAllData(apiData);
        setCountriesCount(apiData.length);
      }).catch((error) => {
        setError(error.message);
      }).finally(() => {
        setLoading(false);
      });
    }
    fetchData();
  }, []);


  // Maybe useEffect() - TODO
  const { unCountriesData, notUNcountriesData } = useMemo(() => {
    console.log('useMemo() 1');
    const { unMembers, nonUnMembers } = extractFilteringByUnMember(allData);
    const unCountries: MinimalFlagsData = composeCountryFlagsData(unMembers.sortByCountryCommonName());
    const notUNCountries: MinimalFlagsData = composeCountryFlagsData(nonUnMembers.sortByCountryCommonName());
    return { unCountriesData: unCountries, notUNcountriesData: notUNCountries };
  }, [allData]);

  // Maybe useEffect() - TODO
  useMemo(() => {
    console.log('useMemo() 2, searchValue =>', searchValue);

    if (searchValue.length) {
      const filteredAllData = cachedAllData.filter((country: any) => {
        return country.name.common.toLowerCase().includes(searchValue.toLowerCase());
      });
      setAllData(filteredAllData);
    } else {
      setAllData(cachedAllData);
    }

  }, [searchValue]);

  return (
    <>
      <h2>My Flags</h2>
      <p>A place where I can search emojis by country and copy to buffer upon click on flag</p>

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
  )
}

export default App
