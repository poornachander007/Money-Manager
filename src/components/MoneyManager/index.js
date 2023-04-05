import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const balancUrl =
  'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png'
const incomeUrl =
  'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png'
const expensesUrl =
  'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png'

class MoneyManager extends Component {
  state = {
    income: 0,
    expenses: 0,
    balance: 0,
    historyList: [],
    titleInput: '',
    amountInput: '',
    optionId: 'INCOME',
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionType = event => {
    this.setState({optionId: event.target.value})
  }

  sumIncome = (total, object) => total + parseInt(object.amount)

  sumExpenses = (total, object) => total + parseInt(object.expenses)

  onAddTransaction = event => {
    event.preventDefault()
    const {
      historyList,
      titleInput,
      //   income,
      //   expenses,
      //   balance,
      amountInput,
      optionId,
    } = this.state
    const totalIncomeArray = historyList.filter(
      eachItem => eachItem.type === 'INCOME',
    )
    const totalIncome = totalIncomeArray.reduce(this.sumIncome, 0)
    console.log(totalIncomeArray)
    console.log(totalIncome)

    const totalExpensesArray = historyList.filter(
      eachItem => eachItem.type !== 'INCOME',
    )
    const totalExpenses = totalExpensesArray.reduce(this.sumExpenses, 0)

    const totalBalance = totalIncome - totalExpenses
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: amountInput,
      type: optionId,
    }
    if (optionId === 'INCOME') {
      this.setState(prevState => ({
        historyList: [...prevState.historyList, newTransaction],
        titleInput: '',
        amountInput: '',
        optionId: 'INCOME',
        income: parseInt(totalIncome) + parseInt(amountInput),
        balance: parseInt(totalBalance) + parseInt(amountInput),
      }))
    } else {
      this.setState(prevState => ({
        historyList: [...prevState.historyList, newTransaction],
        titleInput: '',
        amountInput: '',
        optionId: 'INCOME',
        expenses: parseInt(prevState.expenses) + parseInt(amountInput),
        balance: parseInt(prevState.balance) - parseInt(amountInput),
      }))
    }
  }

  onClickDelete = id => {
    console.log("delte''''''''''''got hit")
    const {historyList} = this.state
    const deletedObject = historyList.find(eachItem => eachItem.id === id)
    const deletedAmount = deletedObject.amount
    const typeId = deletedObject.type

    if (typeId === 'INCOME') {
      this.setState(prevState => ({
        income: parseInt(prevState.income) - parseInt(deletedAmount),
        balance: parseInt(prevState.balance) - parseInt(deletedAmount),
        historyList: prevState.historyList.filter(
          eachHistory => eachHistory.id !== id,
        ),
      }))
    } else {
      this.setState(prevState => ({
        expenses: parseInt(prevState.expenses) - parseInt(deletedAmount),
        balance: parseInt(prevState.balance) + parseInt(deletedAmount),
        historyList: prevState.historyList.filter(
          eachHistory => eachHistory.id !== id,
        ),
      }))
    }
  }

  render() {
    const {
      titleInput,
      amountInput,
      income,
      expenses,
      balance,
      optionId,
      historyList,
    } = this.state
    return (
      <div className="app_container">
        <div className="content_container">
          <div className="profile_container">
            <h1 className="userName">Hi, Richard</h1>
            <p className="wishes">
              Welcome back to your
              <span className="monyManger">Money Manager</span>
            </p>
          </div>

          <div className="moneyDetails_container">
            <MoneyDetails
              moneyTitle="Your Balance"
              amount={balance}
              ImgUrl={balancUrl}
              color="green"
              altTxt="balance"
              dataTestId="balanceAmount"
              key={uuidv4()}
            />
            <MoneyDetails
              moneyTitle="Your Income"
              amount={income}
              ImgUrl={incomeUrl}
              color="aqua"
              altTxt="income"
              dataTestId="incomeAmount"
              key={uuidv4()}
            />
            <MoneyDetails
              moneyTitle="Your Expenses"
              amount={expenses}
              ImgUrl={expensesUrl}
              color="violet"
              altTxt="expenses"
              dataTestId="expensesAmount"
              key={uuidv4()}
            />
          </div>

          <div className="AddTransactionAndHistory">
            <form
              className="addTransaction_container"
              onSubmit={this.onAddTransaction}
            >
              <h1 className="addTransactionHeading">Add Transaction</h1>
              <label htmlFor="titleInput" className="titleInput">
                TITLE
              </label>
              <br />
              <input
                onChange={this.onChangeTitle}
                id="titleInput"
                type="text"
                className="inputs"
                placeholder="TITLE"
                value={titleInput}
              />
              <br />
              <label htmlFor="amountInput" className="amountInput">
                AMOUNT
              </label>
              <br />
              <input
                onChange={this.onChangeAmount}
                id="amountInput"
                type="text"
                className="inputs"
                placeholder="AMOUNT"
                value={amountInput}
              />
              <br />
              <label htmlFor="amountType" className="amountType">
                TYPE
              </label>
              <br />
              <select
                className="selectInput"
                value={optionId}
                onChange={this.onChangeOptionType}
              >
                {transactionTypeOptions.map(eachType => (
                  <option
                    value={eachType.optionId}
                    key={uuidv4()}
                    className="optionItem"
                  >
                    {eachType.displayText}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <div>
                <button type="submit" className="addButton" data-testid="add">
                  Add
                </button>
              </div>
            </form>

            <div className="History_container">
              <h1 className="historyHeading">History</h1>
              <div className="headings_container">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
                <p> </p>
              </div>
              <ul className="transaction_ul_container">
                {historyList.map(eachHistory => (
                  <TransactionItem
                    Details={eachHistory}
                    onClickDelete={this.onClickDelete}
                    key={eachHistory.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
