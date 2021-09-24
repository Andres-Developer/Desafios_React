import React, { Component, useState } from 'react';
import './App.css';

//Versión Componente CLASE de APP:

/* class App extends Component {
  constructor() {
    super();
    //    Estado:     Basicamente inicializar informacion de mi componente
    
    this.state = {
      name: "Gustavo Adolfo",
      age: 32,
      hobbies: ["play soccer", "play chess", "dance"]
    }
  }

  render() {
    return <MyFirstComponent name={this.state.name} age={this.state.age} hobbies={this.state.hobbies} component={newComponent}/>
  }
} */

/* class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "Gustavo Adolfo",
      age: 32,
      hobbies: ["play soccer", "play chess", "dance"]
    }
  }

  updateName = () => {
    this.setState({name: "Garcia Blanco"});
  }

  render() {
    return (
      <div onClick={this.updateName}>
        <MyFirstComponent name={this.state.name} age={this.state.age} hobbies={this.state.hobbies} component={newComponent}/>
      </div>
    )
  }
} */



//Versión Componente Funcional de APP:
const App = () => {
    const [name, setName] = useState("Gustavo Adolfo");
    const [age, setAge] = useState(32);
    const [hobbies, setHobbies] = useState(["play soccer", "play chess", "dance"]);
  
    return (
      <div onClick={() => setName("Estoy en Colombia")}>
        <MyFirstComponent name={name} age={age} hobbies={hobbies} component={newComponent} />
      </div>
    )
  }
  
  

const MyFirstComponent = (props) => {
  return (
    <h1>{props.name} {props.age} {props.hobbies} {props.component({contentButton: 'Hacer click'})}</h1>
  )
}

const newComponent = ({ contentButton }) => {
  function callAlert() {
    alert("Hello World!");
  }
  return <button type="button" onClick={callAlert}>{contentButton}</button>
}

export default App;
