import React, { useMemo, useState } from 'react';
import Routing from '@/routes';
import { BrowserRouter } from 'react-router-dom';
import { GlobalContext } from './contexts/GlobalContext';
import './App.scss';

function App() {
  const [pageTitle, setPageTitle] = useState({
    title: null,
    backUrl: null,
    createdAt: null,
    status: null,
  });
  const [triggerFetchProfile, setTriggerFetchProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    creditBalance: 0,
  });
  const contexValue = useMemo(() => ({
    pageTitle,
    setPageTitle,
    triggerFetchProfile,
    setTriggerFetchProfile,
    currentUser,
    setCurrentUser,
  }), [
    pageTitle,
    triggerFetchProfile,
    currentUser,
  ]);

  return (
    <BrowserRouter>
      <GlobalContext.Provider value={contexValue}>
        <div id='notify-message__mask' />
        <Routing />
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
