// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {ImgUrl, moneyTitle, amount, color, altTxt, dataTestId} = props
  return (
    <li className={`li_container ${color}`}>
      <img src={ImgUrl} alt={altTxt} className="images" />
      <div className="container">
        <p className="moneyTitle">{moneyTitle}</p>
        <p className="amount" data-testid={dataTestId}>
          Rs {amount}
        </p>
      </div>
    </li>
  )
}
export default MoneyDetails
