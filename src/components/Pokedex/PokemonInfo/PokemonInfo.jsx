import React, {useContext} from 'react';
import Card from "../../UI/Card/Card.jsx";
import classes from './PokemonInfo.module.scss';
import PokemonContext from "../../../store/PokemonContext/pokemon-context.jsx";
import {makeFirstLetterUppercase} from "../../../helpers/makeFirstLetterUppercase.js";

const PokemonInfo = () => {
    const context = useContext(PokemonContext);
    const {id, name, picture, stats, types} = context.selectedPokemon;
    const transformedStats = stats.map(data => (
        {
            stats: makeFirstLetterUppercase(data.stat.name),
            value: data.base_stat,
        }));
    const transformedTypes = types.map(data => makeFirstLetterUppercase(data.type.name));
    const pokemonInfo = [
        {
            stats: 'Type',
            value: transformedTypes.toString(),
        },
        ...transformedStats
    ];


    return (
        <Card className={classes["pokemon-info"]}>
            <div className={classes["info__img"]}>
                <img src={picture} alt={name}/>
            </div>
            <div className={classes["info__body"]}>
                <h1>{name}</h1>
                <table>
                    <tbody>
                    {pokemonInfo.map(data => (<tr key={id+Math.floor(Math.random()*10**100)}>
                        <td>{data.stats}</td>
                        <td>{data.value}</td>
                    </tr>))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default PokemonInfo;
