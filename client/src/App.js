
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigationbar from './components/Navigationbar';
import Loginpage from './components/Loginpage';

import { useState } from 'react';



function App() {
  const [isLogin, setisLogin] = useState(false);
  const login=localStorage.getItem('login')
  return (
    < >
     {isLogin||login?<Navigationbar setisLogin={setisLogin}/>: <Loginpage setisLogin={setisLogin}/>}
      
    </>
  );
}

export default App;
