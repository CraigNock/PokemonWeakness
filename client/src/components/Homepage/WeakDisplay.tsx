import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';


interface numObject {
  [key: string]: number
};
interface props {
  weaks: numObject
};
const WeakDisplay : React.FC<PropsWithChildren<props>> = (weaks) => {

  return (
    <Wrapper>
      WeakDisplay
    </Wrapper>
  )
}

export default WeakDisplay;

const Wrapper = styled.div`

`;