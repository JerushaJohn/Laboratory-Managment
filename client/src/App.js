import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Loginpage from './components/Loginpage';
import ProtectedRoute from './components/ProtectedRoute';
import { Route } from 'react-router-dom';
import EnterSample from './components/EnterSample';
import Samples from './components/Samples';
import RegistrationPage from './components/RegistrationPage';
import { Switch } from 'react-router-dom';




function App() {

  return (
    < >

      <Switch>

        <Route exact path='/' component={Loginpage} />
        <ProtectedRoute exact path='/entersample' component={EnterSample} />
        <ProtectedRoute exact path='/samples' component={Samples} />
        <ProtectedRoute exact path='/registrationPage' component={RegistrationPage} />

      </Switch>

    </>
  );
}

export default App;
