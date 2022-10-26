import Form from 'react-bootstrap/Form';

const SelectOrderColumn = (props) => {
    const handle = (e) => {
        props.onSelectNewColumn(e.target.value);
    }

    return (
        <Form.Group className="mb-3">
            <Form.Label>{props.title}</Form.Label>
            <Form.Select onChange={handle}>
                    <option>Unordered</option>
                {props.columns.filter(column => column.notAction).map((column, index) => {
                    return <option
                        key={`selectColumnOrder_${index}`}
                        value={column.displayed}>
                        {column.displayed}
                    </option>
                })}
            </Form.Select>
        </Form.Group>
    )
}

export default SelectOrderColumn;