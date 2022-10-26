import styled from "styled-components";
import Card from 'react-bootstrap/Card';

export const CardStyled = styled(Card)`
    width: ${props => props.width + "px"}
`

export const ToggleDivStyled = styled.div`
    position: absolute;
    top: 1%;
    right: 1%;
`