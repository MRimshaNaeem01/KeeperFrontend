import { useState } from 'react';
import './App.css';
import AddKeeper from './components/addKeeper/AddKeeper';
import Header from './components/header/Header';
import ShowKeeper from './components/showKeeper/ShowKeeper';

function App() {
  const [keeperList, setKeeperList] = useState([]);

  return (
    <div className="App">
     <Header />
     <AddKeeper keeperList={keeperList} setKeeperList={setKeeperList}/>
     <ShowKeeper keeperList={keeperList}/>
    </div>
  );
}

export default App;
