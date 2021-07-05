import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRouter from './components/privateRouters';
import Signup from './components/signup';
import Login from './components/login';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <PrivateRouter exact path='/' component={() => <h2>qq</h2>} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
