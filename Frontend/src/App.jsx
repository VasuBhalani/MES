// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Provider } from 'react-redux';
import { store } from './app/store';
import AppRoutes from './app/routes';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <Provider store={store}>
      <AppRoutes />
    </Provider>
    </>
    
  );
}

export default App;

