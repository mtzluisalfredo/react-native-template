import { registerScreen } from './services/navigation';
import Home from './Home';
import { Auth } from './Screens/';
import Initializing from './Initializing';

const registerScreens = () => {
  registerScreen('Home', Home);
  registerScreen('Initializing', Initializing);
  registerScreen('Auth', Auth);
};

export default registerScreens;
