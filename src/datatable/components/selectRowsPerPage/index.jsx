import Form from 'react-bootstrap/Form';

const SelectRowsPerPage = (props) => {
    const handle = (e) => {
        props.paginatorConfig.setPaginatorConfig(state => {
            return {
                ...state, rowsPerPage: e.target.value
            }
        });
    }

    return (
        <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>{props.title}</Form.Label>
            <Form.Select onChange={handle}>
                {props.rowsPerPage.map((number, index) => {
                    return <option
                        key={`selectRowsPerPage_${index}`}
                        value={number}>
                        {number}
                    </option>
                })}
            </Form.Select>
        </Form.Group>
    )
}

export default SelectRowsPerPage;