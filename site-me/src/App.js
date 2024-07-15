import React from 'react';
import UserList from './componentes/listaUsuarios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meus Usuários</h1>
      </header>
      <main>
        <UserList />
    
      </main>
    </div>
  );
}

export default App;
