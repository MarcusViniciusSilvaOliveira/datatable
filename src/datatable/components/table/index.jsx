import { TableStyled, ThStyled, TdStyled } from './styles';
import { useState, useRef } from 'react';

import { reOrderColumns, GetColumnIndex, AmIBeingDraggin } from '../../helpers/tableFuncions';

const TableContainer = (props) => {
    const [columns, setColumns] = useState(props.columns);

    const [, forceUpdate] = useState(0);
    let originColumnDragged = useRef(null);
    let startBeingDragged = useRef(false);
    let canSwitchColumns = false;
    let targetColumnDroped = null;

    const dataOrdered = props.data.sort((a, b) => a[props.orderColumn] < b[props.orderColumn] ? -1 : 1)
        .slice(props.paginatorConfig.startIndexSliceData(), props.paginatorConfig.endIndexSliceData());

    const onDrop = () => {
        if (!startBeingDragged.current)
            return;
        startBeingDragged.current = false;
        //Force Rerender
        forceUpdate(state => state + 1);
    }

    const onDragStart = (e) => {
        originColumnDragged.current = GetColumnIndex(e.target.id);
        startBeingDragged.current = true;
        //Force Rerender
        forceUpdate(state => state + 1);
    }
    const onDragOver = (e) => {
        e.preventDefault();
        if (targetColumnDroped !== GetColumnIndex(e.target.id)) {
            targetColumnDroped = GetColumnIndex(e.target.id);
            if (targetColumnDroped !== originColumnDragged.current && canSwitchColumns) {
                setColumns(reOrderColumns(columns, originColumnDragged.current, targetColumnDroped));
                originColumnDragged.current = targetColumnDroped;
            }
        } else {
            canSwitchColumns = true;
        }
    }

    return (
        <TableStyled striped bordered hover>
            <thead>
                <tr onMouseOut={onDrop}>
                    {columns.filter(column => column.visible || !column.configurable).map((colum, index) => {
                        return <ThStyled key={`column_${index}`}
                            id={`dataColumn_${index}`}
                            beingDraggin={AmIBeingDraggin(startBeingDragged.current, `dataColumn_${index}`, originColumnDragged.current)}
                            draggable={true}
                            onDrop={colum.configurable ? onDrop : null}
                            onDragStart={colum.configurable ? onDragStart : null}
                            onDragOver={colum.configurable ? onDragOver : null}>{colum.displayed}</ThStyled>
                    })}
                </tr>
            </thead>
            <tbody>
                {dataOrdered.map((item, indexItem) => {
                    return <tr key={`row_${indexItem}`}>
                        {columns.filter(column => column.visible || !column.configurable).map((colum, indexColum) => {
                            return <TdStyled
                                key={`${indexColum}_${indexItem}`}
                                id={`dataRow_${indexColum}_${indexItem}`}
                                beingDraggin={AmIBeingDraggin(startBeingDragged.current, `dataRow_${indexColum}_${indexItem}`, originColumnDragged.current)}>
                                {
                                    item[colum.field] === true ? "Sim" : (item[colum.field] === false ? "Não" : item[colum.field])
                                }
                            </TdStyled>
                        })}
                    </tr>
                })}
            </tbody>
        </TableStyled>
    );
}

export default TableContainer;