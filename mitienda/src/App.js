import ItemListContainer from './components/Item/ItemListContainer';
import './assets/css/App.css';
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer />      
    </>
  );
}

export default App;
