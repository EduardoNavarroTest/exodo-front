import React from 'react'
import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



const Pokeapi = () => {

    const [pokemon, setPokemon] = useState(null);
    const [pokemonId, setPokemonId] = useState(1);

    const getPokemon = async (pokemonId) => {

        await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => response.json())
            .then(data => setPokemon(data))
            .catch(error => console.error(error));

    }


    useEffect(() => {
        getPokemon(pokemonId);
    }, [pokemonId])


    const handlePreview = () => {
        pokemonId > 1 && setPokemonId(pokemonId - 1);
    }

    const handleNext = () => {
        setPokemonId(pokemonId + 1)
    }




    return (
        <div>
            {pokemon && (
                <>
                    {pokemon.name}
                    <br />
                    {pokemon.id}
                    <img src={pokemon.sprites.front_default} alt="" />
                    {pokemonId > 1 ?
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePreview}>Prev</button> :
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled>Prev</button>}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNext}>Next</button>
                </>
            )}

            <Stack spacing={20} direction="row">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack>
        </div >
    )
}

export default Pokeapi
