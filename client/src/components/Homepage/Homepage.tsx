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
  types: numObject,
}


const Homepage : React.FC<PropsWithChildren<props>> = () => {

  const [disable, setDisable] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [suggestArr, setSuggestArr] = useState<string[]>([]);

  const [pokemon, setPokemon] = useState<pokeInfo|null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(()=> {
    if (inputVal.length < 2) {
      setSuggestArr([]);
      return;
    }
    let searchResults: string[] = ALL_NAMES.filter((name) => {
      if (name.toLowerCase().includes(inputVal.toLowerCase())) {
        return name;
      }
    });
    setSuggestArr(searchResults);
  }, [inputVal])



  const submitHandle = () => {
    console.log('inputVal', inputVal);
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
      data.status !== 200? 
        setErrorMsg('Pokemon not found')
        : setPokemon(data);
      setDisable(false);
    })
  }

  return (
    <StyledDiv> 
      <div> Greetings </div>

      <StyledForm
      >
        <SearchBox>
          <StyledInput 
            type="text"
            onChange={(e)=>setInputVal(e.target.value)}
            value={inputVal}
          />
          <SuggestDiv>
            <Suggestions suggestArr={suggestArr} inputVal={inputVal}/>
          </SuggestDiv>
        </SearchBox>
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
      </StyledForm>
      <p>{errorMsg}</p>
      <div>{pokemon && pokemon.id}</div>
      <div>{pokemon && pokemon.name}</div>
      <div>{pokemon && pokemon.types? <WeakDisplay weaks={pokemon.types}/>: ''}</div>
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
const StyledForm=styled.form`
  width: 90%;
  display: flex;
  justify-content: center;
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
`;
const SuggestDiv= styled.div`
  position: relative;
  width: 100%;
`;
const StyledButton = styled.button`
  font-size: .75rem;
`;

export default Homepage;
