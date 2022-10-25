import { ColStyled } from './styles';

const Action = ({ action, item }) => {
    return (
        <ColStyled title={action.title} onClick={() => action.callBackFn(item)}>
            {action.icon()}
        </ColStyled>
    )
}

export default Action;