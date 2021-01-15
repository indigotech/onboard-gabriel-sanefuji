import {Navigation} from 'react-native-navigation';
import App from '../App';
import Users from './pages/users';
import {AddUser} from './pages/add-user';

Navigation.registerComponent('Login', () => App);
Navigation.registerComponent('Users', () => Users);
Navigation.registerComponent('Add User', () => AddUser);
