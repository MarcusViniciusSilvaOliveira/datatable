import Form from 'react-bootstrap/Form';

const SelectOrderColumn = (props) => {
    const handle = (e) => {
        props.onSelectNewColumn(e.target.value);
    }

    return (
        <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>{props.title}</Form.Label>
            <Form.Select onChange={handle}>
                {props.columns.filter(column => column.configurable).map((column, index) => {
                    return <option
                        key={`selectColumnOrder_${index}`}
                        value={column.field}>
                        {column.displayed}
                    </option>
                })}
            </Form.Select>
        </Form.Group>
    )
}

export default SelectOrderColumn;