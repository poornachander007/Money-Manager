// Write your code here
import './index.css'

const deleteUrl =
  'https://assets.ccbp.in/frontend/react-js/money-manager/delete.png'
const TransactionItem = props => {
  const {Details, onClickDelete} = props
  const {id, title, amount, type} = Details
  const onDelete = () => {
    onClickDelete(id)
  }

  return (
    <li className="li_container">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>

      <button
        className="btn"
        type="button"
        data-testid="delete"
        onClick={onDelete}
      >
        <img src={deleteUrl} alt="delete" className="delte_icon" />
      </button>
    </li>
  )
}

export default TransactionItem
