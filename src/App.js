import { useEffect, useState } from 'react';
import './App.css';
import Form from './form/form';

function App() {

let [details,setDetails]=useState([]);
let [obj,setObj]=useState({});
let [id,setId]=useState();

useEffect(()=>{
  fetch(`http://localhost:3003/students`)
  .then((res) => res.json())
  .then((json) =>{
    // console.log(json);
    setDetails(json);
  })
},[obj]);

function child(y){
  setObj(y);
  if(y.id){
    fetch(`http://localhost:3003/students/${y.id}`, {
      method: 'PUT',
      body: JSON.stringify(y),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }
  else{
    fetch('http://localhost:3003/students', {
      method: 'POST',
      body: JSON.stringify(y),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }
  var c=document.querySelector(".child");
  c.classList.add("hide");
}

function update(e){
  var i=e.target.parentNode.parentNode.querySelector(".id").innerText;
  // console.log(i);
  setId(i);

  var c=document.querySelector(".child");
  c.classList.remove("hide");
}

function del(e){
  var i=e.target.parentNode.parentNode.querySelector(".id").innerText;
  fetch(`http://localhost:3003/students/${i}`, {
      method: 'DELETE',
    });
    setObj({});
}

function add(){
  var c=document.querySelector(".child");
  c.classList.remove("hide");
}

function close(){
  // var c=document.querySelector(".child");
  // c.classList.add("hide");
  document.location.reload();
}
  return (
    <div className="App">
      <div>
      <h3>Students Details</h3>
      <button onClick={add}>Add new</button>
      </div>
      <div className='child hide'>
        <div className='form'>
          <div onClick={close} className='close'><i class="ri-close-fill"></i></div>
          <Form prop={child} proId={id}/>
        </div>
      </div>
      <div className='table'>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Branch</th>
          <th>Roll No</th>
          <th>Year</th>
          <th>Native</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {
        details.map(function(x){
          return(
            <tr>
              <td className='id'>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.branch}</td>
              <td>{x.rollNo}</td>
              <td>{x.year}</td>
              <td>{x.place}</td>
              <td><i onClick={update} class="ri-edit-2-fill"></i></td>
              <td><i onClick={del} class="ri-delete-bin-6-fill"></i></td>
            </tr>
          )
        })
        }
      </table>
      </div>
    </div>
  );
}

export default App;
