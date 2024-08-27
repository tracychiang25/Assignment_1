import './App.css';
import Login from './components/Login';
import Index from './components/Index';
import History from './components/History';
import About from './components/About';
import Navbar from './components/Navbar';
import Converter from './components/Converter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists

  return (
    <>
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element = {<Index />} />
          <Route path='/about' element = {<About />} />
          <Route path='/login' element =  {<Login />} />
          <Route path='/history' element = { <History />} />
          <Route path='/gifs' element = { <Converter />} />
        </Routes>
      </Router>
      
    </div>
    </>
  );
}

export default App;
