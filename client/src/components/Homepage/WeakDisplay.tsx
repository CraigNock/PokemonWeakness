import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';


interface numObject {
  [key: string]: number
};
interface props {
  beef: numObject
};
const WeakDisplay : React.FC<PropsWithChildren<props>> = (beef) => {

  return (
    <Wrapper>
      WeakDisplay
    </Wrapper>
  )
}

export default WeakDisplay;

const Wrapper = styled.div`

`;