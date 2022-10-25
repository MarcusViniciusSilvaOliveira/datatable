import { useState } from "react";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TableContainer from "./components/table";
import SelectOrderColumn from "./components/selectOrderColumn";
import ColumnsConfiguration from "./components/columnsConfiguration";

import { CardStyled, ToggleDivStyled } from './styles'
import Paginator from "./components/paginator";
import SelectRowsPerPage from "./components/selectRowsPerPage";

import { ReactComponent as ToggleOn } from 'bootstrap-icons/icons/toggle-on.svg';
import { ReactComponent as ToggleOff } from 'bootstrap-icons/icons/toggle-off.svg';

const Datatable = (props) => {
    // TODO: Just for checking rendering performance
    // TODO: Remove after
    console.log("RenderDataTable")
    const initializeColumnsVisible = () => {
        if (props.actions.actions && props.actions.actions.length > 0) {
            props.columns.push(
                {
                    displayed: props.actions.title,
                    notAction: false,
                    visible: false
                }
            )
        }

        return props.columns.map((colum) => {
            return {
                ...colum,
                notAction: colum.notAction == null ? true : false,
                visible: colum.visible == null ? true : false
            }
        })
    }

    const [showConfigPanel, setShowConfigPanel] = useState(false);
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

    const columns = columnsConfig || [];
    return (
        <CardStyled body>
            <Form as={Row} hidden={!showConfigPanel}>
                <Col sm={3}>
                    <SelectOrderColumn
                        title='Order'
                        columns={columns}
                        onSelectNewColumn={setOrderColumName} />
                </Col>
                <Col sm={3}>
                    <SelectRowsPerPage
                        title='Rows per Page'
                        rowsPerPage={props.rowsPerPage}
                        dataCount={props.data.length}
                        paginatorConfig={{ paginatorConfig, setPaginatorConfig }} />
                </Col>
                <Col sm={3}></Col>
                <Col sm={3}>
                    <ColumnsConfiguration
                        columns={columns}
                        changeColumnsVisible={setcolumnsConfig} />
                </Col>
            </Form>
            <ToggleDivStyled>
                <ToggleOn hidden={!showConfigPanel} onClick={() => setShowConfigPanel(state => !state)}/>
                <ToggleOff hidden={showConfigPanel} onClick={() => setShowConfigPanel(state => !state)}/>
            </ToggleDivStyled>
            <TableContainer
                data={props.data}
                columns={columns}
                actions={props.actions.actions}
                orderColumn={orderColumnName}
                paginatorConfig={paginatorConfig} />
            <Paginator
                dataCount={props.data.length}
                config={paginatorConfig}
                changeConfig={setPaginatorConfig} />
        </CardStyled>
    )
}

export default Datatable;