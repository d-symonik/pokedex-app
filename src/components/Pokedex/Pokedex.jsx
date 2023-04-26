import React, {useContext} from 'react';
import classes from './Pokedex.module.scss';
import PokemonList from "./PokemonList/PokemonList.jsx";
import PokemonInfo from "./PokemonInfo/PokemonInfo.jsx";
import PokemonContext from "../../store/PokemonContext/pokemon-context.jsx";

const Pokedex = () => {
    const context = useContext(PokemonContext);
    return (

            <section className={classes.pokedex}>
                <PokemonList/>
                {context.isVisiblePokemonInfo && <PokemonInfo/>}
            </section>
    );
};

export default Pokedex;
