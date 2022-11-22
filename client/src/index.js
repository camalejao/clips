import { render } from 'react-dom';
import './index.css';
import Navbar from './components/Navbar';
import Routes from './Routes';

render(
  <div>
    <Navbar />
    <div className="container-sm">
      <Routes />
    </div>
  </div>,
  document.getElementById('root')
);

