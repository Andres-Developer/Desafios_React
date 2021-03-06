import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProviderCart from './context/CartContext';
import ItemListContainer from './components/Item/ItemListContainerFirebase';
import ItemDetailContainer from './components/Item/ItemDetailContainerFirebase';
import Cart from "./components/Cart/CartFirebase";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/App.css';
import { Form } from './components/Form/Form';
import NavBootStrap from 'components/NavBar/NavBootStrap';

function App() {
  return (
    <ProviderCart>
      <Router>
        <NavBootStrap/>
        <Switch>
          <Route exact path="/">
            <ItemListContainer />
          </Route>
          <Route exact path="/category/:id">
            <ItemListContainer />
          </Route>
          <Route exact path="/category/">
            <ItemListContainer />
          </Route>
          <Route exact path="/item/:id">
            <ItemDetailContainer />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/form">
            <Form />
          </Route>
        </Switch>
      </Router>
    </ProviderCart>
  );
}

export default App;
