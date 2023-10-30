import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import WorkingArea from './components/WorkingArea';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <WorkingArea />
      <Footer />
    </div>
  );
}

export default App;
