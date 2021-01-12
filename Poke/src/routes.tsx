import {Navigation} from 'react-native-navigation';
import App from '../App';
import Users from './pages/users';

Navigation.registerComponent('Login', () => App);
Navigation.registerComponent('Users', () => Users);
