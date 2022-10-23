import { useState } from "react";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TableContainer from "./components/table";
import SelectOrderColumn from "./components/selectOrderColumn";
import ColumnsConfiguration from "./components/columnsConfiguration";

import { CardStyled } from './styles'
import Paginator from "./components/paginator";
import SelectRowsPerPage from "./components/selectRowsPerPage";
const Datatable = (props) => {

    const initializeColumnsVisible = () => {
        return props.columns.map((colum) => { return { ...colum, visible: true } })
    }

    const [orderColumnName, setOrderColumName] = useState(props.orderColumn)
    const [columnsConfig, setcolumnsConfig] = useState(initializeColumnsVisible())
    const [paginatorConfig, setPaginatorConfig] = useState({
        rowsPerPage: props.rowsPerPage[0],
        page: 1,
        startIndexSliceData() { 
            return (this.page - 1) * this.rowsPerPage
        },
        endIndexSliceData() { 
            return this.rowsPerPage * this.page
        }
    });

    const columns = columnsConfig.sort((a, b) => a.visible || true ? -1 : 1) || [];
    return (
        <CardStyled body>
            <Form as={Row}>
                <Col sm={3}>
                    <SelectOrderColumn
                        title='Ordenação'
                        columns={columns}
                        onSelectNewColumn={setOrderColumName}/>
                </Col>
                <Col sm={3}>
                    <ColumnsConfiguration
                        columns={columns}
                        changeColumnsVisible={setcolumnsConfig}/>
                </Col>
                <Col sm={3}>
                    <SelectRowsPerPage
                        title='Registros por Página'
                        rowsPerPage={props.rowsPerPage}
                        paginatorConfig={{paginatorConfig,  setPaginatorConfig}}/>
                </Col>
            </Form>
            <TableContainer
                data={props.data}
                columns={columns}
                orderColumn={orderColumnName}
                paginatorConfig={paginatorConfig}/>
            <Paginator
                dataCount={props.data.length}
                config={paginatorConfig}
                changeConfig={setPaginatorConfig}/>
        </CardStyled>
    )
}

export default Datatable;