import './App.css';
import React, { useState, useContext, useCallback, useMemo } from 'react';

const THEMES = {
  dark: {
    background: '#000',
    color: '#FFF',
    border: '1px solid #FFF',
  },
  light: {
    background: '#FFF',
    color: '#000',
    border: '1px solid #000',
  },
};

//option 2
// const ThemeContext = React.createContext(THEMES.dark);

// const SearchForm = () => {
//   return (
//     <div>
//       <input />
//       <ThemedButton>Rechercher</ThemedButton>
//     </div>
//   );
// };

// const Toolbar = () => {
//   return (
//     <div>
//       <SearchForm />
//       <ThemedButton>M'inscrire</ThemedButton>
//     </div>
//   );
// };
// //option 1
// // const ThemedButton = ({ children }) => {
// //   return (
// //     <ThemeContext.Consumer>
// //       {(value) => {
// //         return <button style={value}>{children}</button>;
// //       }}
// //     </ThemeContext.Consumer>
// //   );
// // };

//
// const ThemedButton = ({ children }) => {
//   const value = useContext(ThemeContext);
//   return <button style={value}>{children}</button>;
// };

// const App = () => {

//   const [theme, setTheme] = useState('light');
//   const toggleTheme = useCallback(() => {
//     setTheme (t => t ==='light' ? 'dark': 'light')
//   },[])
//   const currentTheme = theme === 'light' ? THEMES.light : THEMES.dark

//   return (
//     <div>
//       <ThemeContext.Provider value={currentTheme}>
//         <Toolbar />
//       </ThemeContext.Provider>
//       <button onClick = {toggleTheme}>change theme</button>
//     </div>
//   );
// };

// export default App;

//option 3
const ThemeContext = React.createContext({
  theme: THEMES.dark,
  toggleTheme: () => {},
});

const SearchForm = () => {
  return (
    <div>
      <input />
      <ThemedButton>Rechercher</ThemedButton>
    </div>
  );
};

const Toolbar = () => {
  return (
    <div>
      <SearchForm />
      <ThemedButton>M'inscrire</ThemedButton>
    </div>
  );
};

const ThemedButton = ({ children }) => {
  const {theme} = useContext(ThemeContext);
  return <button style={theme}>{children}</button>;
};


const App = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);
  const value = useMemo(function() {
    return {
      theme: theme === 'light' ? THEMES.light : THEMES.dark,
      toggleTheme
    }
  },[toggleTheme, theme]); 
  
  const ThemeSwitcher = () => {
    const {toggleTheme} = useContext(ThemeContext)
    return <button onClick={toggleTheme}>Change the theme</button>
  }
  
  
  return (
    <div>
      <ThemeContext.Provider value={value}>
        <Toolbar />
        <ThemeSwitcher />
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
