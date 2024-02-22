import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {About, Dashboard, Home, Projects, SignIn, SignUp, } from  './pages';
import { Footer, Header } from './components';
import PrivateRoute from './components/PrivateRoute';


export default function App() { 
  return (
    <BrowserRouter >
    < Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Route>
      <Route path="/projects" element={<Projects />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}
