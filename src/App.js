import './App.css';
import * as XLSX from "xlsx";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import { useState } from 'react';

function App() {

  const [datosExcel, setDatosExcel] = useState([]);
  
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log('Datos del excel:',d)
      setDatosExcel(d);
    });
  };
  
  return (
    <div className="App">
      <header className="App-header">       
        <p>
        💾🟩Test <code>Leer Excel </code> y plasmar la info en un Tabla🟩💾
        </p>
        <p>La informacion llega a un useState para enviar la info a una api por medio de un array</p>
        <div>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Selecciona El Excel</Form.Label>
        <Form.Control type="file" 
          onChange={(e)=>{
            const file = e.target.files[0];
            readExcel(file);
            }}
        />
        </Form.Group>            
        </div>
        <br/>
        <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>id</th>
          <th>nombre</th>
          <th>apellido</th>
          <th>cedula</th>
        </tr>
      </thead>
      <tbody>
        {
          datosExcel.map ((d) => (
          <tr key={d.datosExcel}>
          <td>{d.id}</td>
          <td>{d.nombre}</td>
          <td>{d.apellido}</td>
          <td>{d.cedula}</td>
          </tr>
          ))
        }        
      </tbody>
      <br/>
    </Table>    
        <a
          className="App-link"
          href="https://www.linkedin.com/in/yesid-quintero-gutierrez-11813b9b/"
          target="_blank"
          rel="noopener noreferrer"
        >
         🤖Yesid Quintero Gutierrez🤖| Desarrollador Frontend |💻React.js💻
        </a>
      </header>
    </div>
  );
}

export default App;
