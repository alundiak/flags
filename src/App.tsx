import { useEffect, useState } from 'react';
import { composeCountryFlagsData, extractFilteringByUnMember, getRestCountriesFromApi } from './shared/helpers';
import { MinimalFlagsData } from './shared/models';
import { SearchField } from './components/SearchField'
import { MainList } from './components/MainList'
import { FlagsCount } from './components/FlagsCount';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [countriesCount, setCountriesCount] = useState(0);
  const [data, setData] = useState<MinimalFlagsData>({});
  const [searchValue, setSearchValue] = useState<string>('');


  useEffect(() => {
    const fetchData = async () => {
      getRestCountriesFromApi().then((apiData) => {
        // console.log(apiData);
        // console.log(JSON.stringify(apiData));

        setCountriesCount(apiData.length);

        const { unMembers, nonUnMembers } = extractFilteringByUnMember(apiData);
        // console.log(unMembers);
        // console.log(nonUnMembers);

        const dataToRender1 = composeCountryFlagsData(unMembers.sortByCountryCommonName());
        const dataToRender2 = composeCountryFlagsData(nonUnMembers.sortByCountryCommonName());

        // console.log(dataToRender1);
        // console.log(dataToRender2);

        // createFlagButtons(dataToRender1, true, unMembers.length);
        // createFlagButtons(dataToRender2, false, nonUnMembers.length);
        setData(dataToRender1)
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log('searchValue => ', searchValue);
    // TODO
  }, [searchValue]);

  return (
    <>
      <h2>My Flags</h2>
      <FlagsCount value={countriesCount} />
      <SearchField onInputHandler={(v) => setSearchValue(v)} />
      <MainList data={data} />
    </>
  )
}

export default App
