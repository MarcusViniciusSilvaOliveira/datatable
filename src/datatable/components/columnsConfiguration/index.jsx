import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


const ColumnsConfiguration = (props) => {
    const columns = props.columns;

    const handle = (e) => {
        const newColumns = columns.map(column => {
            if (column.field === e.target.value)
                column.visible = e.target.checked;
            return column
        })
        props.changeColumnsVisible(newColumns);
    }

    const options = () => {
        return columns.filter(column => column.notAction).map((column, index) => {
            return (
                <Form.Check
                    key={`columnConfig_${index}`}
                    checked={column.visible}
                    type={'checkbox'}
                    label={column.displayed}
                    value={column.field}
                    onChange={handle}
                />
            )
        })
    }

    const overlay = () => {
        return <OverlayTrigger
            trigger="click"
            placement={'bottom'}
            rootClose={true}
            overlay={
                <Popover>
                    <Popover.Header as="h3">Columns</Popover.Header>
                    <Popover.Body>
                        {options()}
                    </Popover.Body>
                </Popover>
            }
        >
            <Button variant="secondary">Columns Display</Button>
        </OverlayTrigger>
    }

    return (
        <div>
            {overlay()}
        </div>
    )
}

export default ColumnsConfiguration;