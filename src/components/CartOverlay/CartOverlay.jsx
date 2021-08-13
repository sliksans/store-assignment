import { PureComponent } from 'react';
import CartItem from '../CartItem/CartItem';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { currencySymbol } from '../../util';
import './styles.css'

export class CartOverlay extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      cartItemCount: 0,
      totalPrice: 0,
    }
  }

  componentDidMount() {
    this.updateData()
  }

  componentDidUpdate() {
    this.updateData()
  }

  updateData() {
    const { cart, currency } = this.props

    const totalCount = Object.values(cart)
      .reduce((t, { qty }) => t + qty, 0)

    const totalPrice = Object.values(cart)
      .reduce((t, { prices, qty }) => t + prices
        .find(p => p.currency === currency).amount * qty, 0)

    this.setState({
      cartItemCount: totalCount,
      totalPrice: totalPrice,
    })
  }

  render() {
    const { cart, currency, close } = this.props
    const { cartItemCount, totalPrice } = this.state

    return (
      <div className="cart-overlay">
        <div className="cart-overlay-top">
          <div className="cart-overlay-top-bold">My bag,</div>
          <div>{cartItemCount} items</div>
        </div>
        <div className="cart-overlay-items">
          {cart.map((item, id) => (
            <CartItem item={item} type={'overlay'} key={id}/>
          ))}
        </div>
        <div className="cart-overlay-total-price">
          <div>Total</div>
          <div>
            {currencySymbol(currency) + totalPrice.toFixed(2)}
          </div>
        </div>
        <div className="cart-overlay-buttons">
          <Link to='/cart' style={{ textDecoration: 'none' }}>
            <button onClick={() => close()}>VIEW BAG</button>
          </Link>
          <button className="cart-overlay-button-green">CHECKOUT</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    currency: state.shop.currency
  }
}

export default connect(mapStateToProps)(CartOverlay);

