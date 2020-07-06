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
position: relative;
  min-height: fit-content;
  height: 100vh;
  width: 100%;
  max-width: 400px;
  max-height: 700px;
  overflow-y: auto;
  margin: 0 auto;
  background: whitesmoke;
  @media (min-width: 400px) {
    border: 5px solid whitesmoke;
    box-sizing: border-box;
  }
`;


export default App;
