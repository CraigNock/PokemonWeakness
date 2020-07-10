import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils';


interface numObject {
  [key: string]: number
};
interface props {
  weaks: numObject
};
const WeakDisplay : React.FC<PropsWithChildren<props>> = ({weaks}) => {

  let weakKeys: string[] = Object.keys(weaks);
  weakKeys.sort((a, b) => {return -(weaks[a] - weaks[b])});
  
  let weaknesses: string[] = [];
  let immunities: string[] = [];
  let resistances: string[] = [];
  // let abilities: string[] = []; //catagory for potential ability modifiers

  weakKeys.forEach(name => {
    if (weaks[name] === 1) return;
    (weaks[name]>1)? weaknesses.push(name) 
    : (weaks[name] > 0 && weaks[name] < 1)? resistances.unshift(name)
    : immunities.push(name);
  })
  // console.log('weaknesses', weaknesses);
  return ( <>
    {weaknesses.length? <Wrapper>
    <Subheader>Weaknesses:</Subheader>
      {weakKeys && weaknesses.map((name, id) => {
        return (
          <Display
            key={id}
            style={{background: COLORS[name]}}
          >
            {name.toUpperCase()} 
            <span> x{weaks[name]}</span>
          </Display>
        )
      })}
    </Wrapper>
    : ''}
    {immunities.length? <Wrapper>
    <Subheader>Immunities:</Subheader>
      {weakKeys && immunities.map((name, id) => {
        return (
          <Display
            key={id}
            style={{background: COLORS[name]}}
          >
            {name.toUpperCase()} 
            <span> x{weaks[name]}</span>
          </Display>
        )
      })}
    </Wrapper>
    : ''}
    {resistances.length? <Wrapper>
      <Subheader>Resistances:</Subheader>
      {weakKeys && resistances.map((name, id) => {
        return (
          <Display
            key={id}
            style={{background: COLORS[name]}}
          >
            {name.toUpperCase()} 
            <span> x{weaks[name]}</span>
          </Display>
        )
      })}
    </Wrapper>
    : ''}
    {/* {abilities.length? <Wrapper>
      <Subheader>Potential Abilities:</Subheader>
      {weakKeys && abilities.map((name, id) => {
        return (
          <Display
            key={id}
            style={{background: COLORS[name]}}
          >
            {name.toUpperCase()} 
            <span> x{weaks[name]}</span>
          </Display>
        )
      })}
    </Wrapper>
    : ''} */}
    </>
  )
}

export default WeakDisplay;

const Wrapper = styled.div`
  /* width: 100%; */
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: .2rem .5rem;
  padding: .25rem .5rem .5rem .5rem;
  background: whitesmoke;
  border-radius: 10px;
  font-family: 'Orbitron', sans-serif;
`;
const Display = styled.p`
  font-size: .8rem;
  margin: .2rem;
  padding: .3rem;
  border-radius: 5px;
  font-family: 'Orbitron', sans-serif;
  color: white;
  text-shadow: 
    0 1px 0 black, 
    0 0 1px rgba(0, 0, 0, 0.3), 
    0 0 2px rgba(0, 0, 0, 0.4), 
    0 0 3px rgba(0, 0, 0, 0.5), 
    0 0 4px rgba(0, 0, 0, 0.6);
  span{
    font-weight: bold;
    font-family: 'Orbitron', sans-serif;
  }
`;
const Subheader = styled.p`
  width: 100%;
  text-align: center;
  padding: .2rem;
  margin: .2rem auto;
  /* font-size: 1.1rem; */
  /* font-weight: bold; */
  border: 2px solid maroon;
  border-radius: 5px;
  background: lightgray;
  
`;