import React, {useEffect, useState} from 'react';

import axios from 'axios';

import classes from './PokemonList.module.scss';
import Card from "../../UI/Card/Card.jsx";
import PokemonCard from "./PokemonCard/PokemonCard.jsx";
import Button from "../../UI/Button/Button.jsx";
import {makeFirstLetterUppercase} from "../../../helpers/makeFirstLetterUppercase.js";
import PokemonFilter from "./PokemonFilter/PokemonFilter.jsx";


const PokemonList = ({onSelectPokemon}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonTypes, setPokemonTypes] = useState([]);

    const [amountOfPokemons, setAmountOfPokemons] = useState(9);

    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/type');

                const transformedTypes = response.data.results.map(item => item.name);
                console.log(transformedTypes)
                setPokemonTypes(transformedTypes);
                setIsLoading(false);
            }
            catch (e){
                throw new Error(e.message);
            }
        }
        const fetchPokemons = async () => {

            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${amountOfPokemons}`);

                const transformedPokemonsData = [];
                for (let result of response.data.results) {

                    const pokemonInfo = await axios.get(result.url);
                    const pokemon = {
                        id: pokemonInfo.data.id,
                        name: makeFirstLetterUppercase(pokemonInfo.data.name),
                        picture: pokemonInfo.data.sprites.front_shiny,
                        types: pokemonInfo.data.types,
                        stats: pokemonInfo.data.stats,
                        weight: pokemonInfo.data.weight,
                        totalMoves: pokemonInfo.data.moves.length,
                    }

                    transformedPokemonsData.push(pokemon);
                }
                setPokemonList(transformedPokemonsData);
                setIsLoading(false);
            } catch (e) {
                throw new Error(e.message);
            }
        }

        fetchTypes().catch(error=>{
            setIsLoading(false);
            setError(error.message)
        })
        fetchPokemons().catch(error => {
            setIsLoading(false);
            setError(error.message)
        });

    }, [amountOfPokemons]);
    const filterPokemonList = (list, type) => {
        return list.filter(pokemon => {
            if (type) {
                return pokemon.types.some(pokemonType => pokemonType.type.name === type);
            }
            return list
        });
    }

    let content;

    if (isLoading) {
        content =
            <div className={classes["custom-loader"]}></div>
    }
    if (error) {
        content = <p>{error}</p>
    }
    if (!isLoading && !error) {
        content = filterPokemonList(pokemonList,selectedType).map(data => <PokemonCard key={data.id} pokemonData={data}
                                                                          onClickPokemon={onSelectPokemon}/>)
    }

    const getMorePokemonHandler = () => {
        setSelectedType(undefined)
        setAmountOfPokemons(prevValue => prevValue + 3);
    };
    const filterSelectHandler = (filterParam)=>{
        setSelectedType(filterParam);
    }

    return (
        <Card className={classes["pokemon__list__card"]}>
            <h1>Pokedex</h1>
            <PokemonFilter pokemonTypes={pokemonTypes} type={selectedType} onSelect={filterSelectHandler}/>
            <ul className={classes["pokemon__list"]}>
                {content}
            </ul>
            {!error && !isLoading && pokemonList.length !== 0 && <div className={classes['list__actions']}>
                <Button onClick={getMorePokemonHandler}>Load more</Button>
            </div>}
        </Card>
    );
};

export default PokemonList;
