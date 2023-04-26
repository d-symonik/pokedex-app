import './App.css'
import Header from "./components/Layout/Header/Header.jsx";
import Container from "./components/Layout/Container/Container.jsx";

import Pokedex from "./components/Pokedex/Pokedex.jsx";
import {PokemonProvider} from "./store/PokemonContext/pokemon-context.jsx";

function App() {

    return (
        <div className="App">
            <Header/>
            <main>
                <Container>
                    <PokemonProvider>
                        <Pokedex/>
                    </PokemonProvider>
                </Container>
            </main>

        </div>
    )
}

export default App
