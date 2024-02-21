import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {About, Dashboard, Home, Projects, SignIn, SignUp, } from  './pages';
import { Footer, Header } from './components';

export default function App() { 
  return (
    <BrowserRouter >
    < Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/projects" element={<Projects />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/login" element={<SignIn />}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}
