import styled from "styled-components";
import Table from 'react-bootstrap/Table';

export const TableStyled = styled(Table)`
    margin-top: 1rem;
`;

export const ThStyled = styled.th`
    background-color: ${({beingDraggin}) => beingDraggin ? `#84a4d1  !important` : `white !important`};
`;

export const TdStyled = styled.td`
    background-color: ${({beingDraggin}) => beingDraggin ? `#84a4d1  !important` : `white !important`};
`;