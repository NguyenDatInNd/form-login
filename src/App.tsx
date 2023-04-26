import './App.css';
import LoginPage from './components/login/FormPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageSignUp from './components/signup/PageSignup';
import HomePage from './home/HomePage';
import Nav from './components/Nav';
import Profile from './components/profile/Profile';
import DetailProduct from './components/detailProduct/DetailProduct';
import DeleteProduct from './components/deleteProduct/DeleteProduct';

function App() {
  return (
    <div style={{background:"#333"}}  className="App"> 
    <Nav/>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/signup' element={<PageSignUp/>}/>
        <Route path='/' element={document.cookie.split("=")[1] ? <HomePage/> : <Navigate to="/login" />}>
          <Route path='/detailProduct/:index' element={<DetailProduct/>}/>
          <Route path='/deleteProduct/:index' element={<DeleteProduct/>}/>
        </Route>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
