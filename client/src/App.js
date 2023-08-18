import './App.css';
import axios from 'axios';
import Landing from './views/Landing';
import Detail from './views/Detail';
import Creation from './views/Creation'
import Cards from './components/Cards/Cards'
import NavBar from './components/NavBar/NavBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGames} from './redux/actions';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const videogames = useSelector(state => state.modifiedVideogames)

  useEffect(()=>{
    if(videogames.length === 0) {console.log("fetching videogames") 
    axios.get("http://localhost:3001/videogames").then(response => {
      dispatch(setGames(response.data))
    })
  }
  }
  , [])


  const handleSubmit = (name)=> {
    axios.get(`http://localhost:3001/videogames/name?search=${name}`)
    .then(({data})=>{dispatch(setGames(data))}).catch((error) =>  {console.log(error.response.data.message);
    if (error.response && error.response.data) {
        window.alert(`Error: ${error.response.data.message}`);
    } else {
        window.alert("An error occurred.");
    }})
  }

return (
    <div className="App">
      {location.pathname!=="/" && <NavBar handleSubmit={handleSubmit}/>}
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Cards videogames={videogames} /> }/>
        <Route path="/creation" element= {<Creation/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>
    </div>
);
}

export default App;
