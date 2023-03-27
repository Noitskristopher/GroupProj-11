import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home'
import Nav from './components/Nav';
import Register from './components/Register';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <Nav className="nav" />
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;