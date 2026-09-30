import { useState } from 'react';

const buttons = [
  { label: 'AC', type: 'action' },
  { label: 'DEL', type: 'action' },
  { label: '%', type: 'action' },
  { label: '/', type: 'operator' },
  { label: '7', type: 'number' },
  { label: '8', type: 'number' },
  { label: '9', type: 'number' },
  { label: '*', type: 'operator' },
  { label: '4', type: 'number' },
  { label: '5', type: 'number' },
  { label: '6', type: 'number' },
  { label: '-', type: 'operator' },
  { label: '1', type: 'number' },
  { label: '2', type: 'number' },
  { label: '3', type: 'number' },
  { label: '+', type: 'operator' },
  { label: '0', type: 'number', wide: true },
  { label: '.', type: 'number' },
  { label: '=', type: 'equals' },
];

const operatorSymbols = ['+', '-', '*', '/'];

function calculate(left, operator, right) {
  const firstNumber = Number(left);
  const secondNumber = Number(right);

  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    return 'Invalid expression';
  }

  if (operator === '/' && secondNumber === 0) {
    return 'Cannot divide by zero';
  }

  const result = {
    '+': firstNumber + secondNumber,
    '-': firstNumber - secondNumber,
    '*': firstNumber * secondNumber,
    '/': firstNumber / secondNumber,
  }[operator];

  return Number.isFinite(result) ? String(result) : 'Invalid expression';
}

function App() {
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [shouldReplaceDisplay, setShouldReplaceDisplay] = useState(false);

  const clearCalculator = () => {
    setDisplay('0');
    setStoredValue(null);
    setOperator(null);
    setShouldReplaceDisplay(false);
  };

  const addNumber = (value) => {
    if (display === 'Cannot divide by zero' || display === 'Invalid expression') {
      clearCalculator();
      setDisplay(value);
      return;
    }

    if (shouldReplaceDisplay || display === '0') {
      setDisplay(value);
      setShouldReplaceDisplay(false);
      return;
    }

    if (value === '.' && display.includes('.')) {
      return;
    }

    setDisplay(`${display}${value}`);
  };

  const chooseOperator = (nextOperator) => {
    if (display === 'Cannot divide by zero' || display === 'Invalid expression') {
      return;
    }

    if (operator && storedValue !== null && !shouldReplaceDisplay) {
      const result = calculate(storedValue, operator, display);
      setDisplay(result);
      setStoredValue(result);
    } else {
      setStoredValue(display);
    }

    setOperator(nextOperator);
    setShouldReplaceDisplay(true);
  };

  const applyPercentage = () => {
    const value = Number(display);
    if (!Number.isFinite(value)) {
      setDisplay('Invalid expression');
      return;
    }

    setDisplay(String(value / 100));
    setShouldReplaceDisplay(false);
  };

  const deleteLast = () => {
    if (display === 'Cannot divide by zero' || display === 'Invalid expression') {
      clearCalculator();
      return;
    }

    const nextDisplay = display.length > 1 ? display.slice(0, -1) : '0';
    setDisplay(nextDisplay === '-' ? '0' : nextDisplay);
  };

  const evaluate = () => {
    if (!operator || storedValue === null || shouldReplaceDisplay) {
      return;
    }

    const result = calculate(storedValue, operator, display);
    setDisplay(result);
    setStoredValue(null);
    setOperator(null);
    setShouldReplaceDisplay(true);
  };

  const handleButtonClick = (label) => {
    if (/\d/.test(label) || label === '.') {
      addNumber(label);
    } else if (operatorSymbols.includes(label)) {
      chooseOperator(label);
    } else if (label === 'AC') {
      clearCalculator();
    } else if (label === 'DEL') {
      deleteLast();
    } else if (label === '%') {
      applyPercentage();
    } else if (label === '=') {
      evaluate();
    }
  };

  return (
    <main className="app-shell">
      <section className="calculator" aria-label="Calculator">
        <div className="calculator-heading">
          <p className="eyebrow">Everyday arithmetic</p>
          <h1>Calculator</h1>
        </div>

        <div className="display" aria-live="polite" aria-label="Calculator display">
          {display}
        </div>

        <div className="keypad">
          {buttons.map((button) => (
            <button
              className={`key ${button.type} ${button.wide ? 'wide' : ''}`}
              key={button.label}
              type="button"
              onClick={() => handleButtonClick(button.label)}
            >
              {button.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
