import axios from 'axios';
import { setCurrentTheme } from './selectTheme';
import { setCurrentCards } from './selectCards';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

setCurrentTheme();
setCurrentCards();