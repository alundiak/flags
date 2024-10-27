// import { useState } from 'react';
// import { SearchField } from './components/SearchField'
import { MainList } from './components/MainList'

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  // const [searchValue, setSearchValue] = useState('');

  // const filterData = () => {
  //   //
  // }

  return (
    <>
      <h2>My Flags</h2>
      {/* <SearchField onInputHandler={(v) => setSearchValue(v)} /> */}
      <MainList />
    </>
  )
}

export default App
