export const reOrderColumns = (columns, origin, target) => {
    const newColumns = columns.map((column, index) => {
        if (index === target)
            return columns[origin];
        if (index === origin)
            return columns[target];
        return column;
    });

    return newColumns;
};

export const orderDataByColumnSelect = (data, columns, columnName) => {
    //Check if selected column is a function
    const column = columns.filter(column => column.displayed === columnName)[0];
    if(!column)
        return data;
    return data.sort((a, b) => renderRowField(a, column) < renderRowField(b, column) ? -1 : 1);
}

export const renderRowField = (item, column) => {
    const stringReturn = item[column.field] === true ? "Sim" : (item[column.field] === false ? "Não" : item[column.field])
    if(typeof(column.field) === 'function'){
        return column.field(item);
    }

    return stringReturn;
}

export const CheckColumnsWidth = (_list) => {
    const list = _list.filter(column => column.notAction)
    const actions = _list.filter(column => !column.notAction)[0]
    let newList = [];
    let counterPercentual = 0;
    let columnsWithoutWidth = 0;

    list.forEach(column => {
        if (!column.width)
            columnsWithoutWidth++;
        else
            counterPercentual += column.width
    });

    if (counterPercentual > 100 || counterPercentual > '100')
        newList = list.map(column => {
            return {
                ...column, width: 100 / list.length
            }
        });
    if (counterPercentual === 100 || counterPercentual === '100'){
        return _list;
    }
        

    if (counterPercentual < 100 || counterPercentual < '100')
        newList = list.map(column => {
            return {
                ...column, width: column.width ? column.width : (100 - counterPercentual) / columnsWithoutWidth
            }
        });

    newList.push(actions)
    return newList;
}

export const AmIBeingDraggin = (tableDraggin, myId, currentColumnDraggin) => {
    if (!tableDraggin)
        return false;
    let myColumn = 0;
    if (myId.includes('dataRow')) {
        myColumn = GetRowIndex(myId);
    }
    else if (myId.includes('dataColumn')) {
        myColumn = GetColumnIndex(myId);
    }
    return myColumn === currentColumnDraggin;
}

export const GetColumnIndex = (id) => {
    return parseInt(id.split('_')[1]);
}

export const GetRowIndex = (id) => {
    return parseInt(id.split('_')[1]);
}