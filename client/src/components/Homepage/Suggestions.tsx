import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface props {
  suggestArr: string[],
  inputVal: string
};
const Suggestions : React.FC<PropsWithChildren<props>> = (suggestArr, inputVal) => {

  return (
    <Wrapper>
      suggest
    </Wrapper>
  )
}

export default Suggestions;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: whitesmoke;
  
`;