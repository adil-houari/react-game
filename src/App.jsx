import  React from 'react';
import  CodeBreaker from './components/CodeBreaker';
import './styles/style.css';


function App() {
    return (
        <div className="app-wrapper">
            <h1 className="tite"> Code Breaker</h1>
            <p className="subtitle">Try to crack the secret color code</p>
            <p className='mini-desc'>
                A modern React mini-game where you must break a secret color code using logic.
            </p>
            <CodeBreaker />
        </div>
    );
}

export default App;