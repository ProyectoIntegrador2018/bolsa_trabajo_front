import React from 'react';
import './App.css';
import Application from './components/Application';
import UserProvider from './components/Authentication/UserProvider';

function App() {
  return (
    <>
    <UserProvider>
      <Application />
    </UserProvider>
    </>
  );
}

export default App;
