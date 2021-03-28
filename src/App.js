import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchLiveDmsComp from './components/SearchLiveDmsComp/SearchLiveDmsComp';

function App() {
  return (

    <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/" component={SearchLiveDmsComp} exact />
    </Switch>
  </Router>
    
  );
}

export default App;
