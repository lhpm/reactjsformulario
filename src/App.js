import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import qs from 'qs';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      name: '',
      language: '',
      about: '',
      mensaje: ''

    }
  }

  onChange(e){

    if(e.target.name === 'acept'){
        this.setState({
          [e.target.name]: e.target.checked
        })
    }else{
        this.setState({
          [e.target.name]: e.target.value
        })
    }
  }

  save(e){

    if(!this.validate()){
      return;
    }

    e.preventDefault();

    // ENVIO DE DATOS CON AXIOS
    const params = {
            nrofactura: this.state.name

    };

    axios.post(`http://localhost/facturar/post.php`, qs.stringify(params))
    .then(res => {
        console.log(res);
        console.log(res.data);
    })
    .catch(res => {
       // Capturamos los errores
       console.log(res);
    })

    this.setState({
          mensaje: 'Guardado correctamente'
    })

  }

  validate(){
    if(this.state.acept != true){
      this.setState({
          mensaje: 'Acepte los términos y condiciones'
      })

      return false
    }

    return true
  }

  render() {
    return (
      <div>
      <h1>Formularios con React JS</h1>

      <label htmlFor="username">Usuario</label>
      <input value={this.state.username} onChange={this.onChange.bind(this)} type="text" name="username" id="username" /><br />

      <label htmlFor="name">Nombre</label>
      <input value={this.state.name} onChange={this.onChange.bind(this)} type="text" name="name" id="name" /><br />

      <label htmlFor="language">Idioma</label>
      <select id="language" name="language" value={this.state.language} onChange={this.onChange.bind(this)}><br />
      <option value="">Seleccione un valor...</option>
      <option value="es">Español</option>
      <option value="en">Inglés</option>
      <option value="de">Alemán</option>
      </select>

      <br /><label htmlFor="gender">Género</label>
      <input value="M" onChange={this.onChange.bind(this)} type="radio" name="gender" /> Hombre
      <input value="F" onChange={this.onChange.bind(this)} type="radio" name="gender" /> Mujer<br />

      <label for="about">Cuéntanos algo sobre tí</label><br />
      <textarea value={this.state.about} onChange={this.onChange.bind(this)} id="about" name="about" /><br />

      <input type="checkbox" value={this.state.acept} onChange={this.onChange.bind(this)} id="acept" name="acept" /> Aceptas Términos y Condiciones<br />

      <div>
      <button onClick={this.save.bind(this)}>Guardar</button>
      <span>{this.state.mensaje}</span>
      </div>


      <p>{JSON.stringify(this.state)}</p>


      </div>

    );
  }
}

export default App;
