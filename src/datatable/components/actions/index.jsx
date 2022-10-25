import Container from 'react-bootstrap/Container';
import { RowStyled } from './styles';

import Action from "./actions";

const ActionCard = (props) => {
    return (
        <Container>
            <RowStyled>
                {
                    props.actions.map((action, index) => {
                        return <Action 
                        item={props.item} 
                        action={action} 
                        key={`actionIndex_${props.keyIndex}_${index}`} />
                    })
                }
            </RowStyled>
        </Container>
    )
}

export default ActionCard;