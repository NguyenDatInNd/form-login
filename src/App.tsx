import './App.css';
import LoginPage from './components/login/FormPage';
import { Route, Routes } from 'react-router-dom';
import PageSignUp from './components/signup/PageSignup';
import HomePage from './home/HomePage';
import Nav from './components/Nav';
import Profile from './components/profile/Profile';

function App() {
  return (
    <div className="App"> 
    <Nav></Nav>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path='/signup' element={<PageSignUp/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
