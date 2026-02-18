import usuario from '../../assets/icones/usuario.png'

import styled from 'styled-components'

const Header = styled.header`
  background: #081226;
  color: #fff;
  padding: 2.5rem 1.25rem;
  display: flex;
  align-items: center;
  height: 4rem;
`;

const Title = styled.h1`
  font-size:3rem;
  
  letter-spacing: 0.5px;
  margin-left: 1rem;
  
`;

const UserIcon = styled.div`
  width: 3.5rem;  
  height: 3.5rem;
  border-radius: 50%;
  background-image: url('${usuario}');
  background-size: cover;
  background-position: center;
  margin-left: auto;
`;

export default function Cabecalho() {
    return (
        <Header>
            <Title>SIAE</Title>
            <UserIcon />
        </Header>

    )
}