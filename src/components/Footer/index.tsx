import styled from 'styled-components'

interface BoxProps {
  flex?: number;
}

const Footer = styled.div<BoxProps>`

background-color: #A9C6D9;

margin: 0.01rem 0.5rem 0.5rem 0.5rem;
gap: 0.5rem;
justify-content: space-between;
 flex: ${(props) => props.flex};
 flex-direction: column;
`

const FooterPai = styled.div`
display: flex;
flex: 1;
width: 100%;
justify-content: space-between;

`
export default function Footer1() {
    return (
        <FooterPai>
            <Footer flex={3}/> 
            <Footer flex={1}/>     
        </FooterPai>
        )
    };