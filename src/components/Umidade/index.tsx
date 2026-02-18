import styled from "styled-components";
import foto from '../../assets/imagens/umidade.png'

const UmidadeDiv = styled.div`
width: 10rem;
background-color: #A9C6D9;
display: inline-block;
margin: 0.5rem 0.5rem 0.5rem 0.5rem;
border-radius:10px;
justify-content: space-between;
 flex: 1;
 background-image: linear-gradient(to bottom, rgba(169, 198, 217, 1) 30%, rgba(169, 198, 217, 0) 100%), url(${foto});
   background-size: cover;
  background-position: center;
`

export default function Umidade() {
    return (
        <UmidadeDiv />
    )
}
