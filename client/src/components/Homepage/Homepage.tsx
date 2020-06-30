import React, { useState, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface props {

};
interface pokeInfo {
  name: string,
  color: string,
  eggGroup: string,
  [key: string]: string,
}
const Homepage : React.FC<PropsWithChildren<props>> = () => {



  const [pokemon, setPokemon] = useState<pokeInfo|null>(null);

    const buttonHandle = () => {
        fetch('http://localhost:8000/pokemon'
        , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then(data => {
            console.log('data', data);
            setPokemon(data);
        })
    }

  return (
    <StyledDiv> 
      {pokemon? 
      <>
      <div> Greetings </div>
        <div>
            <p>Name: {(pokemon && pokemon.name) || 'name'}</p>
            <p>Color: {(pokemon && pokemon.color) || 'color'}</p>
            <p>Egg Group: {(pokemon && pokemon.eggGroup) || 'eggGroup'}</p>
        </div>
      <button
        onClick={()=> buttonHandle()}
      >
        Press Me
      </button>
      </>
    : 
    <button onClick={()=> buttonHandle()}>
      Press Me
    </button>
    }
    </StyledDiv> 
  ) 
}; 

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
      display: flex;
      flex-direction: column;
      align-items: center;
  }
`;

export default Homepage;
