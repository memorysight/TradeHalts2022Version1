import {Outlet} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div >
      <header>Trading Principal Halts</header>
      <div className = "App">
      <Outlet/>
      </div>
      
    </div>
  );
}

export default App;
