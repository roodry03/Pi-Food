// import './App.css';
import LandingPage from './pages/Landing/LandingPage'
import Home from './pages/Home/Home'
import Detail from './pages/Detail/Detail';
import Create from './pages/From/Create'
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
