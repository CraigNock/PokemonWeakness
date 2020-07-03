import React, { useState, useEffect, PropsWithChildren } from 'react';
import styled from 'styled-components';
import Suggestions from './Suggestions';
import WeakDisplay from './WeakDisplay';
import { ALL_NAMES } from '../../utils';

interface props {

};

interface numObject {
  [key: string]: number
};
interface pokeInfo {
  id: number,
  name: string,
  types: string[],
  weaknesses: numObject
}


const Homepage : React.FC<PropsWithChildren<props>> = () => {

  const [disable, setDisable] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [suggestArr, setSuggestArr] = useState<string[] | null>(null);

  const [pokemon, setPokemon] = useState<pokeInfo|null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(()=> {
    if (inputVal.length < 2) {
      setSuggestArr(null);
      return;
    }
    let searchResults: string[] = ALL_NAMES.filter((name) => {
      if ((name !== inputVal.toLowerCase()) && name.toLowerCase().includes(inputVal.toLowerCase())) {
        return name;
      }
    });
    setSuggestArr(searchResults);
  }, [inputVal])



  const submitHandle = (): void => {
    console.log('inputVal', inputVal);
    setSuggestArr(null);
    fetch(`http://localhost:8000/pokemon/${inputVal}`
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
      if(data.status === 200){
        setPokemon(data);
        setErrorMsg('');
      } else { 
        setErrorMsg('Pokemon not found');
      }
      setDisable(false);
    })
  }

  return (
    <StyledDiv> 
      <Title>Pokemon Weakness Finder</Title>

      <StyledForm
      >
        <StyledButton
          type='submit'
          onClick={()=>{
            submitHandle();
            setDisable(true);
          }}
          disabled={disable}
        >
          Get Weaknesses!
        </StyledButton>
        <SearchBox>
          <StyledInput 
            type="text"
            onChange={(e)=>setInputVal(e.target.value)}
            value={inputVal}
            placeholder={'Bulbasaur'}
          />
          <SuggestDiv>
            <Suggestions 
            suggestArr={suggestArr} 
            inputVal={inputVal} 
            setInputVal={setInputVal}/>
          </SuggestDiv>
        </SearchBox>
        
      </StyledForm>
          
      <p>{errorMsg}</p>
      <div>{pokemon && `#${pokemon.id}`}</div>
      <div>{pokemon && pokemon.name.toUpperCase()}</div>
      <div>
        {pokemon && pokemon.weaknesses? 
        <WeakDisplay weaks={pokemon.weaknesses}/>
        : ''}
      </div>
    </StyledDiv> 
  ) 
}; 

const StyledDiv = styled.div`
  /* width: 100%; */
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  background: maroon;
`;
const Title = styled.h1`
  width: 90%;
  margin: 1rem 0;
  padding: .5rem;
  text-align: center;
  font-size: 1.5rem;
  font-family: 'Bangers', cursive;
  color: white;
  background: black;
  border-radius: 15px;
  border: 2px solid white;
`;
const StyledForm=styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: .5rem;
  background: whitesmoke;
  border-radius: 15px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 1rem;
`;
const StyledInput = styled.input`
  width: 100%;
  border: none;
  box-sizing: border-box;
  margin: 0;
  &:focus {
    outline: none;
  }
  text-align: center;
  padding: .3rem;
  border: 3px solid black;
  border-radius: 0 0 7px 7px;
`;
const SuggestDiv= styled.div`
  position: relative;
  width: 100%;
`;
const StyledButton = styled.button`
  width: 100%;
  height: 3rem;
  margin: 0;
  font-size: 1.2rem;
  font-family: 'Bangers', cursive;
  color: whitesmoke;
  background: red;
  border: 3px solid black;
  border-radius: 7px 7px 0 0;
`;

export default Homepage;
