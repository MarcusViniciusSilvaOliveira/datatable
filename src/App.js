import { useEffect, useState } from 'react';
import Datatable from './datatable';
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

  return (
    <div>
      <header className='App-header'>
        <Datatable
          data={array}
          columns={columns}
          orderColumn='username'
          rowsPerPage={rowsPerPage}
        />
      </header>
    </div>
  );
}

export default App;
