import logo from './logo.svg';
import './App.css';
import Screen1 from './Screen1';
import Login from './Login';
import Registeration from './Registeration';
import Screen3 from './Screen3';

function App() {
  return (
    <div className="App">
      <Screen1/>
      <Login/>
      <Registeration/>
      <Screen3/>
    </div>
  );
}

export default App;
