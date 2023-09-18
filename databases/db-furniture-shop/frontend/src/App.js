import React from 'react';
import './App.css';
import {StoreProvider} from './Store'
import Routes from './Routes';
import Map from './components/Map';
import Profile from './pages/Profile';


const App = () => {
  return (
 
    <div className="App">
      
      <StoreProvider>
        <Routes/>
      </StoreProvider>

    
    </div>
  );
}

export default App;
