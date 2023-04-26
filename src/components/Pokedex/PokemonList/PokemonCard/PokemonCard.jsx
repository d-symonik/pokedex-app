import React, {useContext} from 'react';
import Card from "../../../UI/Card/Card.jsx";
import classes from './PokemonCard.module.scss';
import {makeFirstLetterUppercase} from "../../../../helpers/makeFirstLetterUppercase.js";
import PokemonContext from "../../../../store/PokemonContext/pokemon-context.jsx";

const PokemonCard = ({pokemonData}) => {
    const context = useContext(PokemonContext);
    const {id, name, picture, types} = pokemonData;

    const pokemonTypes = types.map(item => item.type.name);

    const pokemonTypesContent = pokemonTypes.map((type) =>
        <span key={id * Math.floor(Math.random() * 10 ** 10)} className={`${classes[type]}`}>
            {makeFirstLetterUppercase(type)}
        </span>
    )
    const cardClickHandler = () => {
        context.selectNewPokemon(pokemonData);
        context.showPokemonInfoDisplay();
    }
    return (
        <Card className={classes['pokemon-card']} onClick={cardClickHandler}>
            <div className={classes['pokemon-img']}>
                <img src={picture} alt={name}/>
            </div>
            <div className={classes['pokemon-info']}>
                <p>{name}</p>
                <div className={classes["pokemon-types"]}>
                    {pokemonTypesContent}
                </div>
            </div>
        </Card>
    );
};

export default PokemonCard;
