import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {About, Dashboard, Home, Projects, SignIn, SignUp, CreatePost, 
  UpdatePost, PostPage } from  './pages';
import { Footer, Header } from './components';
import {PrivateRoute, OnlyAdminPrivateRoute } from './components';


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
      <Route path="/post/:postSlug" element={<PostPage />}></Route>
      <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/updatepost/:postId' element={<UpdatePost />} />
        </Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}
