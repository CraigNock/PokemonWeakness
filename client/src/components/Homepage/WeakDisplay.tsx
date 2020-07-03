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
  let weakValues: number[] = Object.values(weaks);
  return (
    <Wrapper>
      {weakKeys && weakKeys.map((name, id) => {
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
  )
}

export default WeakDisplay;

const Wrapper = styled.div`
  /* width: 50%; */
  margin: .5rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
`;
const Display = styled.p`
  font-size: 1rem;
  padding: .2rem;
  border-radius: 5px;
  font-family: 'Orbitron', sans-serif;
  span{
    font-weight: bold;
    font-family: 'Orbitron', sans-serif;
  }
`;