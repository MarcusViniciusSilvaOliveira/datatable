import { useEffect, useState } from 'react';
import Datatable from './datatable';
import {ReactComponent as ReactLogo} from 'bootstrap-icons/icons/bell-fill.svg';
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
      icon: () => <ReactLogo />,
      title: 'teste',
      action: () => { console.log("Clicou") }
    }
  ]

  if(array.length === 0)
    return <div></div>

  return (
    <div>
      <ReactLogo />
      <header className='App-header'>
        <Datatable
          data={array}
          columns={columns}
          orderColumn='username'
          actions={actions}
          rowsPerPage={rowsPerPage}
        />
      </header>
    </div>
  );
}

export default App;
