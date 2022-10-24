import Form from 'react-bootstrap/Form';

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

    return (
        <div className="mb-3">
            {columns.filter(column => column.configurable).map((column, index) => {
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
        </div>
    )
}

export default ColumnsConfiguration;