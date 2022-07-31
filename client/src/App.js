
import './App.css';
import Header from './components/Header/Header'
import {Route, Routes, useNavigate} from 'react-router-dom'
import Home from './components/Home/Home'
import AboutMe from "./components/AboutMe/AboutMe";
import Contacts from "./components/Contacts/Contacts";
function App() {
  return (
    <div className="Blog__app">
      <Header />
      <div className="page__content">
        <Routes>
            <Route path='home' element={<Home />} />
            <Route path='about' element={<AboutMe />} />
            <Route path='contacts' element={<Contacts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
