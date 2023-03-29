import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home'
import Nav from './components/Nav';
import Register from './components/Register';
import Login from './components/Login';
import DisplayAll from './components/DisplayAll';
import DisplayOne from './components/DisplayOne';

function App() {
  return (
    <div className="App">
      <Nav className="nav" />
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/myPortal' element={<DisplayAll />} />
        <Route path='/myPortal/:id' element={<DisplayOne />} />
      </Routes>
    </div>
  );
}

export default App;