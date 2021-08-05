import { renderPage } from './routes.js';
import { loginPersistence } from './lib/authentication.js';

window.addEventListener('load', loginPersistence());
window.addEventListener('popstate', renderPage);
window.addEventListener('load', renderPage);
