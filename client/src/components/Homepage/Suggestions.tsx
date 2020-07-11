import React from 'react';
import styled from 'styled-components';

interface props {
  suggestArr: string[] | null,
  inputVal: string,
  setInputVal: React.Dispatch<React.SetStateAction<string>>,
  submitHandle: (pokeName: string | null) => void
};
const Suggestions : React.FC<props> = ({suggestArr, inputVal, setInputVal, submitHandle}) => {

  return (
    <Wrapper>
      
      {suggestArr && (suggestArr.length)? 
      suggestArr.map((name:string, id: number) => {
        if (id < 11)
        return <StyledP 
        key={id}
        tabIndex={0}
        onKeyDown={(e) => {
          if(e.keyCode === 13) {
            e.preventDefault();
            setInputVal(name);
            submitHandle(name);
          }
        }}
        onClick={(e)=>{
          e.preventDefault();
          setInputVal(name);
          submitHandle(name);
        }}
        >
          <span>
            {name.slice(0, name.toLowerCase().indexOf(inputVal.toLowerCase()))}
          </span>
          <span className="bold">
            {name.slice(name.toLowerCase().indexOf(inputVal.toLowerCase()),
            name.toLowerCase().indexOf(inputVal.toLowerCase()) + inputVal.length)}
          </span>
          <span>
            {name.slice((name.toLowerCase().indexOf(inputVal.toLowerCase())) + inputVal.length)}
          </span>
        </StyledP>
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
const StyledP = styled.p`
  width:100%;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
  font-size: 1.1rem;
  padding: .4rem 0;
  border-radius: 5px;
  &:hover {
    background: white;
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
`;