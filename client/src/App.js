import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home'
import Register from './components/Register';
import Login from './components/Login';
import DisplayAll from './components/DisplayAll';
import DisplayOne from './components/DisplayOne';
import EditForm from './components/EditForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/myPortal' element={<DisplayAll />} />
        <Route path='/myPortal/:id' element={<DisplayOne />} />
        <Route path='/myPortal/:id/edit' element={<EditForm />} />
      </Routes>
    </div>
  );
}

export default App;