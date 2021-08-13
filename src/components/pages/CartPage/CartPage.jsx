import { PureComponent } from 'react';
import { connect } from 'react-redux'
import CartItem from '../../CartItem/CartItem';
import './styles.css'

export class CartPage extends PureComponent {


  render() {
    const { cart } = this.props

    return (
      <div className="cart-page-container">
        <h2>CART</h2>
        <div className="cart-page-item-container">
          {cart.map((item, id) => <CartItem item={item} key={id} />)}
          {cart.length ? <div></div> : ''}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart
  }
}

export default connect(mapStateToProps)(CartPage);