document.addEventListener('DOMContentLoaded', function () {
    const keys = document.querySelector('.calculator-keys');
    const screen = document.querySelector('.calculator-screen');

    function calculate(n1, operator, n2) {
        let result = '';
        const firstNum = parseFloat(n1);
        const secondNum = parseFloat(n2);
        if (operator === '+') result = firstNum + secondNum;
        else if (operator === '-') result = firstNum - secondNum;
        else if (operator === '*') result = firstNum * secondNum;
        else if (operator === '/') result = firstNum / secondNum;
        else if (operator === '%') result = (firstNum / 100) * secondNum;
        return result.toString();
    }

    keys.addEventListener('click', (e) => {
        if (!e.target.matches('button')) return;

        const key = e.target;
        const action = key.textContent;
        const keyContent = key.textContent;
        const displayedNum = screen.value;
        const previousKeyType = keys.dataset.previousKeyType;
        const operator = keys.dataset.operator;
        const firstValue = keys.dataset.firstValue;

        if (!key.classList.contains('operator') && !key.classList.contains('all-clear')) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                screen.value = keyContent;
            } else {
                screen.value = displayedNum + keyContent;
            }
            keys.dataset.previousKeyType = 'number';
        }

        if (key.classList.contains('decimal')) {
            if (!displayedNum.includes('.')) {
                screen.value = displayedNum + '.';
            } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                screen.value = '0.';
            }
            keys.dataset.previousKeyType = 'decimal';
        }

        if (key.classList.contains('operator')) {
            keys.dataset.previousKeyType = 'operator';
            keys.dataset.firstValue = displayedNum;
            keys.dataset.operator = key.value;
        }


        if (key.classList.contains('equal-sign')) {
            const secondValue = displayedNum;
            const calculationResult = calculate(firstValue, operator, secondValue);
            screen.value = calculationResult;
            keys.dataset.previousKeyType = 'calculate';
        }

        if (key.classList.contains('all-clear')) {
            screen.value = '0';
            delete keys.dataset.firstValue;
            delete keys.dataset.operator;
        }

        if (key.classList.contains('negate')) {
            screen.value = parseFloat(displayedNum) * -1;
        }

        if (key.classList.contains('percentage')) {
            if (operator && firstValue) {
                screen.value = calculate(firstValue, operator, displayedNum);
            } else {
                screen.value = parseFloat(displayedNum) / 100;
            }
        }
    });
});
