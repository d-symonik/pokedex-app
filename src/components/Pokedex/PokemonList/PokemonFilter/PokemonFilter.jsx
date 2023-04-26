import React from 'react';
import classes from './PokemonFilter.module.scss';

import {makeFirstLetterUppercase} from "../../../../helpers/makeFirstLetterUppercase.js";

const PokemonFilter = ({pokemonTypes,type,onSelect}) => {
    const selectTypeHandler = (event) => {
        const value = event.target.value;
        if (value === '---') {
            onSelect(undefined);
            return;
        }
        onSelect(value);
    };
    return (
        <div className={classes['pokemon__filter']}>
            <label htmlFor="filterSelect">Type: </label>
            <select
                name="filterSelect"
                id="filterSelect"
                value={type}
                onChange={selectTypeHandler}
            >
                <option value="---">---</option>
                {pokemonTypes.map(type => <option
                        key={Math.floor(Math.random() * 10 ** 10)}
                        id="filterSelect"
                        value={type}
                    >
                        {makeFirstLetterUppercase(type)}
                    </option>
                )}

            </select>
        </div>
    );
};

export default PokemonFilter;
