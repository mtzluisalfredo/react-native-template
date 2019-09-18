import { registerScreen } from './services/navigation';
import Home from './Home';
import { Auth, SignUp } from './Screens/';
import Initializing from './Initializing';

const registerScreens = () => {
  registerScreen('Home', Home);
  registerScreen('Initializing', Initializing);
  registerScreen('Auth', Auth);
  registerScreen('SignUp', SignUp);
};

export default registerScreens;
