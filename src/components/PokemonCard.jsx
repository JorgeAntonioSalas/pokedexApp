import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/PokemonCard.css";
import Backgrounds from "../hooks/useBackgrounds";

// eslint-disable-next-line react/prop-types
const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();

  const { background, color, backgroundSelect } = Backgrounds();

  useEffect(() => {
    if (url) {
      axios.get(url).then((res) => {
        setPokemon(res.data);
        backgroundSelect(res);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li className="pokemon-card" onClick={() => navigate(`/pokedex/${pokemon.id}`)} style={{ background: background }}>
      <div >
            <div style={{ background: background }}><img src={pokemon.sprites?.other["official-artwork"].front_default} alt=""/></div>
            <div>  
                <div>
                    <h2 style={{ color: color }}>{pokemon.name}</h2> 
                    <p><b>Types: </b> {pokemon?.types?.[0]?.type.name}  {pokemon?.types?.[1]?.type.name} </p>
                </div>
                <div>
                    <ul>
                        <li><b>HP </b> <p>{pokemon.stats?.[0].base_stat} </p></li>
                        <li><b>Attack: </b> <p>{pokemon.stats?.[1].base_stat} </p></li>
                        <li><b>Defense: </b> <p>{pokemon.stats?.[2].base_stat} </p></li>
                        <li><b>Speed: </b> <p>{pokemon.stats?.[5].base_stat} </p></li>
                    </ul>
                </div>
            </div>  
      </div>
    </li>
  );
};

export default PokemonCard;
