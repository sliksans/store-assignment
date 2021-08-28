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
    const { brand, name, prices, attributes, cartId, qty, gallery } = item

    return (
      <div>
        {type !== 'overlay' && <hr/>}
        <div className={type === 'overlay' ? "overlay-item" : "page-item"}>
          <div className="left">
            <div className="brand">{brand}</div>
            <div className="name">{name}</div>
            <div className="price">
              {currencySymbol(currency) + prices
                .find(p => p.currency === currency).amount.toFixed(2)}
            </div>
            <div className="attributes">
              {attributes.map((attribute, id) =>
                <div key={id}>
                  <div className="attribute-name">
                    {attribute.items[0].id === "Yes" &&
                      attribute.name + ':'}
                  </div>
                  <AttributePicker
                    attribute={attribute}
                    cartProduct={item}
                    inCart={true}
                  />
                </div>)}
            </div>
          </div>
          <div className="right">
            <div className="quantity">
              <button onClick={() => adjustQuantity(cartId, qty + 1)}>+</button>
              <div className="number">{qty}</div>
              <button onClick={() => adjustQuantity(cartId, qty - 1)}>-</button>
            </div>
            {type === 'overlay' ?
              <div className="image">
                <img src={gallery[0]} alt={name} />
                <div className="remove" onClick={() => removeFromCart(cartId)}>
                  <AiFillCloseSquare />
                </div>
              </div> :
              <div className="image">
                <CartPageGallery gallery={gallery} />
                <div className="remove" onClick={() => removeFromCart(cartId)}>
                  <AiFillCloseSquare />
                </div>
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