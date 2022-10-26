import { TableStyled, ThStyled, TdStyled } from './styles';
import { useState, useRef } from 'react';

import {
    reOrderColumns,
    GetColumnIndex,
    AmIBeingDraggin,
    CheckColumnsWidth,
    renderRowField,
    orderDataByColumnSelect
} from '../../helpers/tableFuncions';

import ActionCard from '../actions/index';

const TableContainer = (props) => {
    const [columns, setColumns] = useState(props.columns);
    
    const [, forceUpdate] = useState(0);
    let originColumnDragged = useRef(null);
    let startBeingDragged = useRef(false);
    let canSwitchColumns = false;
    let targetColumnDroped = null;

    const dataOrdered = orderDataByColumnSelect(props.data, columns, props.orderColumn).slice(props.paginatorConfig.startIndexSliceData(), props.paginatorConfig.endIndexSliceData());

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

    const copyToClipboard = (e) => {
        e.preventDefault();
        const textElement = document.getElementById(e.target.id);
        navigator.clipboard.writeText(textElement.innerHTML);

        props.onCopyClipboard(textElement.innerHTML);
    }

    window.onclick = function (e) {
      }
    return (
        <TableStyled striped bordered hover>
            <thead>
                <tr onMouseOut={onDrop}>
                    {CheckColumnsWidth(columns).filter(column => column.visible || !column.notAction).map((column, index) => {
                        return <ThStyled key={`column_${index}`}
                            width={column.width}
                            id={`dataColumn_${index}`}
                            beingDraggin={AmIBeingDraggin(startBeingDragged.current, `dataColumn_${index}`, originColumnDragged.current)}
                            draggable={true}
                            onDrop={column.notAction ? onDrop : null}
                            onDragStart={column.notAction ? onDragStart : null}
                            onDragOver={column.notAction ? onDragOver : null}>{column.displayed}</ThStyled>
                    })}
                </tr>
            </thead>
            <tbody>
                {dataOrdered.map((item, indexItem) => {
                    return <tr key={`row_${indexItem}`}>
                        {CheckColumnsWidth(columns).filter(column => column.visible || !column.notAction).map((column, indexColum) => {
                            if (!column.notAction)
                                return <TdStyled key={`dataRow_${indexColum}_${indexItem}`}>
                                    <ActionCard actions={props.actions} keyIndex={`${indexColum}_${indexItem}`} item={item} />
                                </TdStyled>
                            return <TdStyled width={column.width}
                                key={`${indexColum}_${indexItem}`}
                                id={`dataRow_${indexColum}_${indexItem}`}
                                onClick={copyToClipboard}
                                beingDraggin={AmIBeingDraggin(startBeingDragged.current, `dataRow_${indexColum}_${indexItem}`, originColumnDragged.current)}>
                                {
                                    renderRowField(item, column)
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