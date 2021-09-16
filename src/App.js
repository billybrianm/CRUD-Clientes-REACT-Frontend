import React from 'react';

class App extends React.Component {
  componentDidMount() {
    const apiUrl = '/api/usuarios';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log('Dados: ', data._embedded.usuarios[0]));
  }
  render() {
    return <h1>Componente test no console </h1>;
  }
}
export default App;