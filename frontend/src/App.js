import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import UserProfile from './pages/UserProfile';
import 'semantic-ui-css/semantic.min.css'
import MoviePage from './pages/MoviePage';
import MoodPage from './pages/Mood';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';
import AdminPage from './pages/Admin';

function App() {

  const isLoading = useSelector(state => state.loading.value);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/UserProfile" component={UserProfile} />
          <PrivateRoute exact path="/movie/:id" component={MoviePage} />
          <PrivateRoute exact path="/Mood" component={MoodPage} />
          <PrivateRoute exact path="/category/:id" component={HomePage} />
          <PrivateRoute exact path="/populer" component={HomePage} />
          <PrivateRoute exact path="/mood/:id" component={HomePage} />
          <PrivateRoute exact path="/secure-admin" component={AdminPage} />
          <PrivateRoute exact path="/" component={HomePage} />
        </Switch>
      </Router>

      <Loading active={isLoading}/>
    </div>
  );
}

export default App;
