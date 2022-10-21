import TableContainer from "./components/table";

const Datatable = (props) => {
    return <TableContainer 
        data={props.data}
        columns={props.columns.sort((a,b) => a.visible ? -1 : 1) || []}
        orderColumn={props.orderColumn}
    />
}

export default Datatable;