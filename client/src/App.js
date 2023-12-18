import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Lobby from './pages/Lobby';
import Room from './pages/Room';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Lobby />} />
        <Route path='/room/:id' element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
