import  { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { useNavigate } from 'react-router-dom';
import '../styles/pokedex.css';
import Header from './Header';


const Pokedex = () => {

    const name = useSelector(state=>state.userName)

    const [pokemonList, setPokemonList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [nameInput, setNameInput] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1279')
        .then(res=>setPokemonList(res.data.results))

        //para cargar el tipo seleccionado
        axios.get('https://pokeapi.co/api/v2/type/')
        .then(res=>setTypeList(res.data.results))

    },[]);

    const getAllPokemons = () =>{
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1279')
        .then(res=>setPokemonList(res.data.results))
    }

    const searchName = ()=>{
        navigate(`/pokedex/${nameInput}`)
    }

    const searchType = (typeUrl)=> {
        if(typeUrl) {
            axios.get(typeUrl)
            .then(res => setPokemonList(res.data.pokemon))
            .then(setPage(1));
        } else {
            getAllPokemons();
        }
    }

    const [page,setPage] = useState(1);
    const pokemonsPerPage = 16;
    const lastPokemonIndex = page * pokemonsPerPage;
    const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage;
    const pokemonPaginated = pokemonList.slice(firstPokemonIndex, lastPokemonIndex)




    return (
        <div className='pokedex'>
            <Header/>
            <p className='welcomemsg'>Hi <span> <b>{name}</b> </span>, welcome to the Pokedex!</p>
            <div>
                <div>
                    <input 
                        type="text" 
                        placeholder='search name or number'
                        value={nameInput}
                        onChange={e=>setNameInput(e.target.value)}  />
                    <button onClick={searchName}>Search</button>
                </div>
                <select onChange={e => searchType(e.target.value)}>
                    <option value={''}>All pokemons - Select a type</option> 
                    {typeList.map(type => (
                        <option value={type.url} key={type.url}>
                            {type.name} 
                        </option>
                    ))}
                </select>
                { (page >1)?   
                        <div>
                            <button onClick={()=> {setPage(page-1)}}><i className="fa-solid fa-arrow-left"></i></button>
                            <button onClick={()=> {setPage(page+1)}}><i className="fa-solid fa-arrow-right"></i></button>
                        </div> : 
                        <div>
                            <button onClick={()=> {setPage(page+1)}}><i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                }
                         
                
            </div>

            {/* <div>
            { (page >1)?   
                <div>
                    <button onClick={()=> {setPage(page-1)}}>Previous Page</button>
                    <button onClick={()=> {setPage(page+1)}}>Next Page</button>
                </div> : 
                <div>
                    <button onClick={()=> {setPage(page+1)}}>Next Page</button>
                </div>
            }
            </div> */}
            {/* <div className="pokemon-container"> */}
                <ul className="col-pokemon">
                    {
                        pokemonPaginated?.map(pokemon =>
                        <PokemonCard 
                        url={pokemon.url ? pokemon.url : pokemon.pokemon.url} 
                        key={pokemon.url ? pokemon.url : pokemon.pokemon.url}/>)
                    }
                </ul>
            {/* </div> */}
            
        </div>
    );
};

export default Pokedex;