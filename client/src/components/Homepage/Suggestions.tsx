import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface props {
  suggestArr: string[] | null,
  inputVal: string,
  setInputVal: React.Dispatch<React.SetStateAction<string>>
};
const Suggestions : React.FC<props> = ({suggestArr, inputVal, setInputVal}) => {

  return (
    <Wrapper>
      
      {suggestArr && (suggestArr.length)? 
      suggestArr.map((name:string, id: number) => {
        if (id < 11)
        return <StyledLi 
        key={id}
        onClick={()=>setInputVal(name)}
        >
          {name}
        </StyledLi>
      }) : ''}
      
      
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
  border-radius: 5px;
`;
const StyledLi = styled.p`
  width:100%;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
  padding: .1rem 0;
  border-radius: 5px;
  &:hover {
    background: white;
    cursor: pointer;
  }
`;