import React, { useState, useEffect, PropsWithChildren } from 'react';
import styled from 'styled-components';
import Suggestions from './Suggestions';
import WeakDisplay from './WeakDisplay';
import { ALL_NAMES, COLORS } from '../../utils';

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
  const [errorMsg, setErrorMsg] = useState<string|null>(null);

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



  const submitHandle = (pokeName: string | null): void => {
    // console.log('inputVal', inputVal);
    if (inputVal === '') {
      setErrorMsg('Enter Pokemon name');
      setPokemon(null);
    } else {
      setDisable(true);
      setSuggestArr(null);
      fetch(`pokemon/${pokeName? pokeName: inputVal}`
      , {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(data => data.json())
      .then(data => {
        // console.log('data', data);
        if(data.status === 200){
          setPokemon(data);
          setErrorMsg(null);
          setInputVal('');
        } else { 
          setErrorMsg('Pokemon not found');
          setPokemon(null);
        }
        setDisable(false);
      }).catch(err=>{
        console.log('fetch err', err);
        setErrorMsg('Server Unavailable');
        setDisable(false);
      })
    }
  }

  // const testweak = {
  //   fire: 0.5,
  //   water: 2,
  //   grass: 0.5,
  //   ice: 0.5,
  //   ground: 2,
  //   bug: 0.5,
  //   rock: 2,
  //   steel: 0.5
  // }

  return (
    <>
    <StyledDiv
      style={{background: pokemon? COLORS[pokemon['types'][0]] : 'maroon'}}
    > 
      <Title>Pokemon Weakness Finder</Title>

      <StyledForm
      >
        <StyledButton
          type='submit'
          onClick={(e)=>{
            e.preventDefault();
            submitHandle(null);
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
            placeholder={'Enter Pokemon'}
          />
          <ClearButton
            onClick={()=>setInputVal('')}
          >
            X
          </ClearButton>
          <SuggestDiv>
            <Suggestions 
            suggestArr={suggestArr} 
            inputVal={inputVal} 
            setInputVal={setInputVal}
            submitHandle={submitHandle}
            />
          </SuggestDiv>
        </SearchBox>
        
      </StyledForm>
      
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      {pokemon && pokemon.weaknesses?
      <InfoDisplayDiv>
        <Info>
          <InfoP>
            {pokemon && `#${pokemon.id} ${pokemon.name.toUpperCase()}`}
          </InfoP>
          <SmallTypes>
            <span>{pokemon && pokemon.types[0]}</span>
            <span>{pokemon && pokemon.types[1]? `/${pokemon.types[1]}`:''}</span>
          </SmallTypes>
        </Info>
        <WeakDisplay weaks={pokemon.weaknesses}/>
      </InfoDisplayDiv>
        : ''}
      {/* <WeakDisplay weaks={testweak}/> */}
    </StyledDiv> 
    <BottomDiv
      style={{background: pokemon? (COLORS[pokemon['types'][1]] || COLORS[pokemon['types'][0]]) : 'lightgray'}}
    ></BottomDiv>
    </>
  ) 
}; 

const StyledDiv = styled.div`
  width: 100%;
  /* max-width: 400px; */
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: maroon; */
`;
const Title = styled.h1`
  width: 100%;
  margin: 0 0 .5rem 0;
  padding: .3rem .5rem;
  box-sizing: border-box;
  text-align: center;
  font-size: 1.5rem;
  font-family: 'Bangers', cursive;
  color: white;

  background: black;
  /* border-radius: 15px; */
  /* border: 2px solid white; */
  /* border-top: none; */
  border-bottom: 2px solid white;
  border-top: 2px solid white; 
`;
const StyledForm=styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: .5rem;
  margin: 0 0 .25rem 0;
  background: whitesmoke;
  border-radius: 15px;
`;
const SearchBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const StyledInput = styled.input`
  width: 100%;
  border: none;
  box-sizing: border-box;
  margin: 0;
  &:focus {
    outline: none;
  }
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  text-align: center;
  padding: .3rem;
  border: 3px solid black;
  border-radius: 0 0 7px 7px;
`;
const ClearButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: calc(.3rem + 3px);
  right: 1rem;
  width: .75rem;
  height: .75rem;
  border-radius: 50%;
  background: maroon;
  border: 2px solid maroon;
  color: white;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  overflow: hidden;
  /* box-sizing: border-box; */
  &:hover {
    cursor: pointer;
  }
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
  text-shadow: 
    0 1px 0 black, 
    0 0 1px rgba(0, 0, 0, 0.6), 
    0 0 2px rgba(0, 0, 0, 0.7), 
    0 0 3px rgba(0, 0, 0, 0.8), 
    0 0 4px rgba(0, 0, 0, 0.9);
  background: red;
  /* border: 3px solid black; */
  border-top: 3px groove #CCCCCC;
  border-right: 3px solid #333333;
  border-bottom: 3px solid #333333;
  border-left: 3px groove #CCCCCC;
  border-radius: 7px 7px 0 0;
  &:hover{
    cursor:pointer;
  }
  &:disabled {
    filter: grayscale(50%);
  }
`;
const ErrorMessage = styled.p`
  margin: .25rem;
  padding: .1rem .2rem;
  font-size: .75rem;
  color: orange;
  font-family: 'Orbitron', sans-serif;
  background: whitesmoke;
  border-radius: 3px;
`;
const InfoDisplayDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;
const Info = styled.div`
  margin:  0;
  padding: .3rem .5rem;
  background: white;
  border-radius: 10px;
  border: 2px solid black;
  p {
    font-family: 'Orbitron', sans-serif;
  }
`;
const InfoP = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;
const SmallTypes = styled.p`
  font-size: .7rem;
  text-align: center;
`;
const BottomDiv = styled.div`
  width: 100%;
  height: 50%;
  /* background: lightgray; */
`;

export default Homepage;
