import './App.css';
import NavBar from './Component/NavBar';
import Home from './Component/Home'
import Profile from './Component/Profile'
import About from './Component/AboutUs'
import Contact from './Component/ContactUs'
import LogIn from './Component/SignIn'
import Registration from './Component/SignUp'
import LogOut from './Component/LogOut';
import ErrorPage from './Component/ErrorPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {initialState, reducer} from './Component/ReducerFunc'
// 15.i) ContextAPI
import { createContext, useReducer } from 'react';

export const ContextData = createContext();

// 15.ii) Provider
const RoutesData = () => {
  return(
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/logout' element={<LogOut />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

const App = () => {
  // 15.iii) useReducer
  const [stateVal, dispatch] = useReducer(reducer, initialState)
  return (
    <ContextData.Provider value={{stateVal, dispatch}}>
        <div className="App">
          <Router>
            <NavBar />

            {/* 15.ii) Provider */}
            <RoutesData />
            
          </Router>
        </div>
    </ContextData.Provider>

  );
}

export default App;
