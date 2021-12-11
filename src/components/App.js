import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fBase';
 
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggendIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggendIn(true);
      } else {
        setIsLoggendIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn = {isLoggedIn} /> : "Initializing..."} 
      <footer>&copy; {new Date().getFullYear()} Twitter </footer>
    </>
  );
}

export default App;
