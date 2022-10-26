import { useEffect, useState } from 'react';
import Datatable from './datatable';
import { ReactComponent as Check } from 'bootstrap-icons/icons/check-square-fill.svg';
import { ReactComponent as Refuse } from 'bootstrap-icons/icons/x-square-fill.svg';
import { ReactComponent as Trash } from 'bootstrap-icons/icons/trash-fill.svg';

const Demo = () => {

    const [array, setArray] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/comments');
            const json = await data.json();
            setArray(json);
        }

        fetchData();
    }, [])

    const columns = [
        {
            displayed: 'Name',
            field: 'name',
            width: 20
        },
        {
            displayed: 'E-mail',
            field: 'email',
            width: 20
        },
        {
            displayed: 'Description',
            field: 'body',
            width: 50
        },
        {
            displayed: 'Code',
            field: (item) => `Identity_${item.id}`,
        },
    ]

    const rowsPerPage = [
        5,
        10,
        15,
        20
    ]

    const actions = [
        {
            icon: () => <Check />,
            title: 'Approve',
            callBackFn: (item) => { alert(`You are about to approve this item: ${item.name}`) }
        },
        {
            icon: () => <Refuse />,
            title: 'Refuse',
            callBackFn: (item) => { alert(`You are about to refuse this item: ${item.name}`) }
        },
        {
            icon: () => <Trash />,
            title: 'Remove',
            callBackFn: (item) => { alert(`You are about to remove this item: ${item.name}`) }
        }
    ]

    const onCopyClipboard = (e) => {
        alert(`Copied to clipboard: ${e}.`)
    }

    if (array.length === 0)
        return <div></div>

    return <Datatable
        data={array}
        columns={columns}
        tableWidth={1400}
        copyable={true}
        onCopied={onCopyClipboard}
        actions={{ actions, title: 'Actions' }}
        rowsPerPage={rowsPerPage}
    />
}

export default Demo;