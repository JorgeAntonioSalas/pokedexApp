import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UserInput from './components/UserInput';
import PokemonDetail from './components/PokemonDetail';
import Pokedex from './components/Pokedex';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<UserInput/>} />

          <Route element={<ProtectedRoutes/>}>
            <Route path='/pokedex' element={<Pokedex/>} />
            <Route path='/pokedex/:id' element={<PokemonDetail/>} />
          </Route>
          
        </Routes> 
      </div>
    </HashRouter>
  )
}

export default App
