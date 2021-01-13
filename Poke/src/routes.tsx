import {Navigation} from 'react-native-navigation';
import App from '../App';
import Main from './pages/main';

Navigation.registerComponent('Login', () => App);
Navigation.registerComponent('Main', () => Main);
