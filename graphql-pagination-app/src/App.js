import './App.css';
import FilmList from './Components/FilmList/Filmlist';
import { Navbar } from './Components/Navbar/Navbar';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (query) => {
      setSearchQuery(query);
  };

  return (
    <div>
      <Navbar onSearchInputChange={handleSearchInputChange}/>
      <FilmList searchQuery={searchQuery} />
    </div>
  );
}

export default App;
