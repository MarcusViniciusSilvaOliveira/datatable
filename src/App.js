import { useEffect, useState } from 'react';
import Datatable from './datatable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [array, setArray] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await data.json();
      setArray(json);
    }

    fetchData();
  }, [])

  const columns = [
    {
      displayed: 'Nome',
      field: 'name',
      visible: true,
      width: 100
    },
    {
      displayed: 'Username',
      field: 'username',
      visible: true,
      width: 100
    },
    {
      displayed: 'E-mail',
      field: 'email',
      visible: true,
      width: 100
    },
    {
      displayed: 'Number',
      field: 'phone',
      visible: true,
      width: 100
    },
    {
      displayed: 'Site',
      field: 'website',
      visible: true,
      width: 100
    },
  ]

  return (
    <div>
      <header className='App-header'>
        <Datatable
          data={array}
          columns={columns}
          orderColumn='username'
        />
      </header>
    </div>
  );
}

export default App;
