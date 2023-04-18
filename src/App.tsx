import './App.css';
import LoginPage from './components/login/FormPage';
import { Route, Routes } from 'react-router-dom';
import PageSignUp from './components/signup/PageSignup';
import HomePage from './home/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path='/Signup' element={<PageSignUp/>}/>
        <Route path='/Home' element={<HomePage/>}/>

      </Routes>
    </div>
  );
}

export default App;
