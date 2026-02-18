import styled from 'styled-components'
import Umidade from '../Umidade'

const Quadradinhos = styled.div`
width: 10rem;
background-color: #A9C6D9;
display: inline-block;
margin: 0.5rem 0.5rem 0.5rem 0.5rem;

justify-content: space-between;
 flex: 1;
`

const QuadradoPai = styled.div`
display: flex;

flex: 1;
width: 100%;

`

export default function Information1() {
    return (
        <QuadradoPai>
            <Umidade />
            <Quadradinhos />
            <Quadradinhos />
            <Quadradinhos />
        </QuadradoPai>
        
    )
}