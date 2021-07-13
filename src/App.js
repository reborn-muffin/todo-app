import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRouter from './components/privateRouters';
import Signup from './components/signup';
import Login from './components/login';
import { Provider } from 'react-redux'
import { store, persistor } from './store/store'
import TodoPage from './components/features/todoPage';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PersistGate persistor={persistor}>
            <PrivateRouter exact path='/' component={TodoPage} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
          </PersistGate>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
