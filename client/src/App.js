import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home'
import Nav from './components/Nav';


function App() {
  return (
    <div className="App">
      <Nav className="nav"/>
      <Routes>
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;