import Form from 'react-bootstrap/Form';

const SelectRowsPerPage = (props) => {
    const handle = (e) => {
        props.paginatorConfig.setPaginatorConfig(state => {
            const maxPage = Math.ceil(props.dataCount / e.target.value);
            return {
                ...state, rowsPerPage: e.target.value, page: maxPage < state.page ? maxPage : state.page
            }
        });
    }

    return (
        <Form.Group className="mb-3">
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