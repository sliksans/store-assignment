import { PureComponent } from 'react';
import AttributePicker from '../AttributePicker/AttributePicker';
import CartPageGallery from '../CartPageGallery/CartPageGallery';
import { adjustQuantity, removeFromCart } from '../../redux/Shopping/shopping-actions'
import { AiFillCloseSquare } from 'react-icons/ai'
import { connect } from 'react-redux'
import { currencySymbol } from '../../util';
import './styles.css'


export class CartItem extends PureComponent {

  render() {
    const { item, type, adjustQuantity, removeFromCart, currency } = this.props

    return (
      <div>
        {type !== 'overlay' ? <hr></hr> : ''}
        <div className={type === 'overlay' ? "overlay-item" : "page-item"}>
          <div className="left">
            <div className="name">{item.name}</div>
            <div className="price">
              {currencySymbol(currency) + item.prices.find(p => p.currency === currency).amount.toFixed(2)}
            </div>
            <div className="attributes">
              {item.attributes.map((attribute, id) =>
                <div key={id}>
                  <div className="attribute-name">
                    {attribute.items[0].id === "Yes" ? attribute.name + ':' : ''}
                  </div>
                  <AttributePicker attribute={attribute} cartProduct={item} inCart={true} />
                </div>)}
            </div>
          </div>
          <div className="right">
            <div className="quantity">
              <button onClick={() => adjustQuantity(item.cartId, item.qty + 1)}>+</button>
              <div className="number">{item.qty}</div>
              <button onClick={() => adjustQuantity(item.cartId, item.qty - 1)}>-</button>
            </div>
            {type === 'overlay' ?
              <div className="image">
                <img src={item.gallery[0]} alt={item.name} />
                <div className="remove" onClick={() => removeFromCart(item.cartId)}><AiFillCloseSquare /></div>
              </div> :
              <div className="image">
                <CartPageGallery gallery={item.gallery} />
                <div className="remove" onClick={() => removeFromCart(item.cartId)}><AiFillCloseSquare /></div>
              </div>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.shop.currency
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    adjustQuantity: (itemID, value) => dispatch(adjustQuantity(itemID, value)),
    removeFromCart: (itemID) => dispatch(removeFromCart(itemID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);