import {Navigation} from 'react-native-navigation';
import App from '../App';
import Users from './pages/main';

Navigation.registerComponent('Login', () => App);
Navigation.registerComponent('Main', () => Users);
