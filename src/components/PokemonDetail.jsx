import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Backgrounds from "../hooks/useBackgrounds";
import "../styles/PokemonDetail.css";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const { background, color, backgroundSelect } = Backgrounds();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
      setPokemon(res.data);
      backgroundSelect(res);
    });
  }, [id, backgroundSelect]);

  return (
    <div className="pokemon.details">
      <Header />
      <div>
        <div className="pokemon">
          <div style={{ background: background }}>
            <img
              src={pokemon.sprites?.other["official-artwork"].front_default}
              alt=""
            />
          </div>
          <div>
            <h2> #{pokemon.id}</h2>
            <div>
              <div></div>
              <h1 style={{ color: color }}>{pokemon.name}</h1>
              <div></div>
            </div>
          </div>
        </div>

        <div className="features">
          <div>
            <p>
              <b>Height</b>
            </p>
            <p>
              <b>{pokemon.height}</b>
            </p>
          </div>
          <div>
            <p>
              <b>Weight</b>
            </p>
            <p>
              <b>{pokemon.weight}</b>
            </p>
          </div>
        </div>

        <div className="typeskills">
          <div className="type">
            <div></div>
            <p>
              <b>Types: </b> {pokemon?.types?.[0]?.type.name}{" "}
              {pokemon?.types?.[1]?.type.name}{" "}
            </p>
          </div>
          <div className="skills"></div>
        </div>

        <div className="stats">
          <div>
            <p>
              <b>HP</b> {pokemon.stats?.[0].base_stat}{" "}
            </p>
            <p>
              <b>Attack</b> {pokemon.stats?.[1].base_stat}{" "}
            </p>
            <div>
              <p>
                <b>Defense</b> {pokemon.stats?.[2].base_stat}{" "}
              </p>
              <p>
                <b>Speed</b> {pokemon.stats?.[5].base_stat}{" "}
              </p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
