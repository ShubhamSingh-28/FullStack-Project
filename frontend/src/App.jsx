

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/'
      element={<Login/>}/>
       <Route path='/signup'
      element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
