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

    }

    addNumber(number) {
        this.currentValue = number
    }

    selectOperation(operation) {

    }

    compute() {

    }

    updateDisplay() {
        this.currentValueTxtElement.innerText = this.currentValue
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