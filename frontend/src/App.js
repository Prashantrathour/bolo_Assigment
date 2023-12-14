import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import MainRoutes from './MainRoutes';

function App() {
  return (
    <div className="p-0 m-0 box-border">
      <div className='p-2 bg-orange-300 '>
        <h1 className='p-2 text-white font-semibold text-lg'>Bolo Form</h1>
        
      </div>
     <MainRoutes/>
    </div>
  );
}

export default App;
