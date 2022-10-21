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