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
          <p
            key={id}
            style={{background: COLORS[name]}}
          >
            {name.toUpperCase()} 
            <span> x{weaks[name]}</span>
          </p>
        )
      })}
    </Wrapper>
  )
}

export default WeakDisplay;

const Wrapper = styled.div`

`;
const Display = styled.p`
  
`;