import React from 'react';
import styled from 'styled-components';
import Global from '../../GlobalStyles';
import Homepage from '../Homepage';

const App = () => {
  return (
    <Wrapper>
      <Global />
      <Homepage/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vw;
  width: 100vw;
`;


export default App;
