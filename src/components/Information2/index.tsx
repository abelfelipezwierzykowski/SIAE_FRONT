import styled from 'styled-components';
const Quadradinhos2 = styled.div`
width: 10rem;

background-color: #A9C6D9;
display: inline-block;
margin: 0.5rem 0.5rem 0.5rem 0.5rem;
gap: 0.5rem;
justify-content: space-between;
 flex: 1;
`

const QuadradoPai2 = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
flex: 1;
width: 100%;

`
export default function Information2() {   
    return (
        <QuadradoPai2>
            <Quadradinhos2 />
    
            <Quadradinhos2 />
        </QuadradoPai2>
        )
    };