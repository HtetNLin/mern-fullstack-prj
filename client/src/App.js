import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Create from './components/Create/create';
import Auth from "./components/Auth/Auth";
import { useState } from "react";
const App = () => {
  
   const [currentId, setCurrentId] = useState(null);

  return (
    <Router>
      <Container maxidth="lg">
        <Navbar />
        <Switch>
         <Route exact path = '/'>
           <Home currentId={currentId} setCurrentId={setCurrentId} />
         </Route>
         <Route exact path = '/create'>
           <Create currentId={currentId} setCurrentId={setCurrentId} />
         </Route>
         <Route exact path = '/auth' component = {Auth} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
