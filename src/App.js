import { useEffect, useState } from 'react';
import './App.css';
import AddKeeper from './components/addKeeper/AddKeeper';
import Header from './components/header/Header';
import ShowKeeper from './components/showKeeper/ShowKeeper';
import axios from 'axios';

function App() {
  const [keeperList, setKeeperList] = useState([]);

  
  useEffect(() => {
    axios.get('http://localhost:8000/api/getAll').then(res => setKeeperList(res.data));
  }, []);

  return (
    <div className="App">
      {/* {console.log(keeperList)} */}
      <Header />
      <AddKeeper keeperList={keeperList} setKeeperList={setKeeperList} />
      <ShowKeeper keeperList={keeperList} setKeeperList={setKeeperList} />
    </div>
  );
}

export default App;
