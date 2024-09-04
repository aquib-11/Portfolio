import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import {ToastContainer} from 'react-toastify';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Auth0Provider
      domain="dev-u807c7oigyo5yvp7.us.auth0.com" //{process.env.REACT_APP_DOMAIN}
      clientId="vicpgfMK9cBig216q4LRk9077ZW3hQfi" //{process.env.REACT_APP_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/contact`,
      }}
      cacheLocation="localstorage"
    >
      <App />
      <ToastContainer position="top-center" />
    </Auth0Provider>
  </>
);
