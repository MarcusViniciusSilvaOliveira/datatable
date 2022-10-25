import { useEffect, useState } from 'react';
import Datatable from './datatable';
import {ReactComponent as Check} from 'bootstrap-icons/icons/check-square-fill.svg';
import {ReactComponent as Refuse} from 'bootstrap-icons/icons/x-square-fill.svg';
import {ReactComponent as Trash} from 'bootstrap-icons/icons/trash-fill.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [array, setArray] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/todos');
      const json = await data.json();
      setArray(json);
    }

    fetchData();
  }, [])

  const columns = [
    {
      displayed: 'Finalizado',
      field: 'completed',
    },
    {
      displayed: 'Título',
      field: 'title',
    },
    {
      displayed: 'Código',
      field: 'id',
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
      callBackFn: (item) => { alert(`You are about to approve this item: ${item.title}`) }
    },
    {
      icon: () => <Refuse />,
      title: 'Refuse',
      callBackFn: (item) => { alert(`You are about to refuse this item: ${item.title}`) }
    },
    {
      icon: () => <Trash />,
      title: 'Remove',
      callBackFn: (item) => { alert(`You are about to remove this item: ${item.title}`) }
    }
  ]

  if(array.length === 0)
    return <div></div>

  return (
    <div>
      <header className='App-header'>
        <Datatable
          data={array}
          columns={columns}
          orderColumn='username'
          actions={{actions, title: 'Actions'}}
          rowsPerPage={rowsPerPage}
        />
      </header>
    </div>
  );
}

export default App;
