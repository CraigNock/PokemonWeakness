import React from 'react';
import styled from 'styled-components';
import Global from '../../GlobalStyles';

const App = () => {
  return (
    <Wrapper>
      <Global />
      <div>
        AAAAAPPPPPP
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vw;
  width: 100vw;
`;


export default App;
