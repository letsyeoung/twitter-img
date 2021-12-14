import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fBase';
 
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggendIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggendIn(true);
        setUserObj(user);
      } else {
        setIsLoggendIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn = {isLoggedIn} userObj={userObj} />
       ) : (
         "기다려..."
       )} 
      <footer>&copy; {new Date().getFullYear()} Twitter </footer>
    </>
  );
}

export default App;
