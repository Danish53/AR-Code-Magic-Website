// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { BrowserRouter } from 'react-router-dom';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//    <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
// import { ContextProvider } from './ContextApi';
// import store from './redux/store';
// import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={store}> */}
    {/* <ContextProvider> */}
      <RouterProvider router={router} />
    {/* </ContextProvider> */}
    {/* </Provider> */}
  </StrictMode>
);
