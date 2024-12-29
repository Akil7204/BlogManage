import React,{useEffect, useState} from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes,Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { UserContextProvider } from "./context/UserContext";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import MyBlogs from "./pages/MyBlogs";
import EditPost from "./pages/EditPost";
import Cookies from 'js-cookie'
import { useLocation } from "react-router-dom";


function App() {
  const [token,setToken] = useState(false)
  const location = useLocation();
  useEffect(()=>{
    const isToken = Cookies.get('token')
    if(isToken){
      setToken(true)
      
    }else{
      setToken(false)
    }
  },[token,location])
  return (
    <div>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={  token ? <Navigate to="/" /> : <Login />  } />
          <Route exact path="/register" element={ token ? <Navigate to="/" /> : <Register /> } />
          <Route exact path="/write" element={ token ? <CreatePost /> : <Navigate to="/" />} />
          <Route exact path="/posts/post/:id" element={  token ? <PostDetails /> : <Navigate to="/" /> } />
          <Route exact path="/myblogs/:id" element={ token ? <MyBlogs /> : <Navigate to="/" /> } />
          <Route exact path="/edit/:id" element={ token ? <EditPost />: <Navigate to="/" />  } />
          <Route exact path="*" element={ <NotFound/>  } />
        </Routes>
        <Footer />
      </UserContextProvider>
    </div>
  );
}


export default App;
