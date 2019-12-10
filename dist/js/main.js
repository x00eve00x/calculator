class Calculator {
    constructor(previousValueTxtElement, currentValueTxtElement) {
        this.previousValueTxtElement = previousValueTxtElement
        this.currentValueTxtElement = currentValueTxtElement
        this.clearAll()
    }

    clearAll() {
        this.currentValue = ''
        this.previousValue = ''
        this.operation = undefined
    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1)
    }

    addNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) return
        this.currentValue = this.currentValue.toString() + number.toString()
    }

    selectOperation(operation) {
        if (this.currentValue === '') return
        if (this.previousValue !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousValue = this.currentValue
        this.currentValue = ''
    }

    compute() {
        let calculation
        const previous = parseFloat(this.previousValue)
        const current = parseFloat(this.currentValue)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                calculation = previous + current
                break
            case '-':
                calculation = previous - current
                break
            case '*':
                calculation = previous * current
                break
            case '÷':
                calculation = previous / current
                break
            default:
                return
        }
        this.currentValue = calculation
        this.operation = undefined
        this.previousValue = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerNumbers = parseFloat(stringNumber.split('.')[0])
        const decimalNumbers = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerNumbers)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerNumbers.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalNumbers != null) {
            return `${integerDisplay}.${decimalNumbers}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentValueTxtElement.innerText =
            this.getDisplayNumber(this.currentValue)
        if (this.operation != null) {
            this.previousValueTxtElement.innerText =
                `${this.getDisplayNumber(this.previousValue)} ${this.operation}`
        } else {
            this.previousValueTxtElement.innerText = ''
        }
    }
}
// BUTTONS
const numBtns = document.querySelectorAll('[data-number]')
const operatorBtns = document.querySelectorAll('[data-operator]')
const equalsBtn = document.querySelector('[data-equals]')
const delBtn = document.querySelector('[data-delete]')
const clearBtn = document.querySelector('[data-clear]')
// OUTPUT
const previousValueTxtElement = document.querySelector('[data-previous]')
const currentValueTxtElement = document.querySelector('[data-current]')
// CALCULATOR
const calculator = new Calculator(previousValueTxtElement, currentValueTxtElement)

numBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearBtn.addEventListener('click', button => {
    calculator.clearAll()
    calculator.updateDisplay()
})

delBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})