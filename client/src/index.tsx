import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/Auth/AuthContextProvider';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core';
import './scss/index.scss';
import { theme } from './theme';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
