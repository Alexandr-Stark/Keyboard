import './App.css';
import { Provider } from 'react-redux';
import ControlPanel from './components/ControlPanel/ControlPanel';
import DevicesPanel from './components/MyDevices/DevicesPanel';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className='wrapper'>
        <DevicesPanel/>
        <ControlPanel/>
      </div>
    </Provider>
  );
}

export default App;
