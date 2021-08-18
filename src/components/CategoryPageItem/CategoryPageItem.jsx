import { PureComponent } from 'react';
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addToCart, setCurrentItem } from '../../redux/Shopping/shopping-actions'
import { currencySymbol } from '../../util';
import './styles.css'

export class CategoryPageItem extends PureComponent {

  render() {
    const { productData, currency } = this.props
    const url = `/${productData.category}/${productData.id}`

    return (
      <Link
        to={url}
        style={{ textDecoration: 'none', color: productData.inStock ? 'black' : 'gray' }}
      >
        <div className="main-wrapper">
          {!productData.inStock ?
            <div className="out-of-stock">
              OUT OF STOCK
            </div> : ''}
          <div className="image-wrapper">
            <img
              className="product-image"
              src={productData.gallery[0]}
              alt="item"
              style={!productData.inStock ? { opacity: 0.3 } : {}}
            />
          </div>
          {productData.inStock ?
            <div className="item-cart-button" >
              <div className="item-cart-button-icon">
                <FiShoppingCart />
              </div>
            </div> : ''}
          <div className="text-wrapper">
            <div className="item-name">{`${productData.brand} ${productData.name}`}</div>
            <div className="price">{currencySymbol(currency) + productData.prices.find(p => p.currency === currency).amount.toFixed(2)}</div>
          </div>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentProduct: state.shop.currentItem,
    currency: state.shop.currency
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentItem: (item) => dispatch(setCurrentItem(item)),
    addToCart: (item) => dispatch(addToCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPageItem);