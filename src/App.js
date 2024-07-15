import React from 'react';
import UserList from '../site-me/src/componentes/listaUsuarios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meus Usuários</h1>
      </header>
      <main>
        <UserList />
        <h1>TESTE</h1>
      </main>
    </div>
  );
}

export default App;
