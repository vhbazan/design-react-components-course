import React from 'react';
import useTheme from '../hooks/useTheme';

const ThemeContext = React.createContext();


const ThemeProvider = ({children}) => {
  const state = {};

  return (
    <ThemeContext.Provider value={state}>
      {children}
    </ThemeContext.Provider>
  )
}


export {ThemeContext};