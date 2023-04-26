import React, {useState} from "react";

const PokemonContext = React.createContext({
    selectedPokemon: {},
    isVisiblePokemonInfo: Boolean,
    showPokemonInfoDisplay: () => {
    },
    selectNewPokemon: (pokemon) => {},
})
export const PokemonProvider = ({children}) => {
    const [currentPokemon, setCurrentPokemon] = useState({});
    const [isVisibleInfo, setIsVisibleInfo] = useState(false);

    const pokemonSelectHandler = (pokemonData) => {

        setCurrentPokemon(pokemonData);
    }
    const showPokemonInfo = () => {
        setIsVisibleInfo(true);
    }

    return (
        <PokemonContext.Provider value={{
            selectedPokemon: currentPokemon,
            isVisiblePokemonInfo: isVisibleInfo,
            showPokemonInfoDisplay: showPokemonInfo,
            selectNewPokemon: pokemonSelectHandler
        }}
        >
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonContext;
