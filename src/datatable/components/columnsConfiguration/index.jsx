import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ColumnsConfiguration = (props) => {
    const [columns, setColumns] = useState(props.columns);

    const submit = (e) => {
        e.preventDefault();
        props.changeColumnsVisible(columns);
    }

    const handle = (e) => {
        const newColumns = columns.map(column => {
            if (column.field === e.target.value)
                column.visible = e.target.checked;
            return column
        })

        setColumns(newColumns);
    }

    return (
        <div className="mb-3">
            {columns.map((column, index) => {
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
            })}
            <Button variant="primary" onClick={submit}>
                Save
            </Button>
        </div>
    )
}

export default ColumnsConfiguration;