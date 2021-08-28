import { PureComponent } from 'react';
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addToCart, setCurrentItem } from '../../redux/Shopping/shopping-actions'
import { currencySymbol } from '../../util';
import './styles.css'

export class CategoryPageItem extends PureComponent {

  render() {
    const { productData, currency, addToCart } = this.props
    const { category, id, inStock, gallery, brand, name, prices } = productData
    const url = `/${category}/${id}`

    const productHasAttributes = productData.attributes.length > 0

    return (
      <div className="item-wrapper">
        {inStock ?
          <Link
            to={productHasAttributes ? url : '#'}
            onClick={() => !productHasAttributes ? addToCart(productData) : ''}
          >
            <div className="item-cart-button"
            >
              <div className="item-cart-button-icon">
                <FiShoppingCart />
              </div>
            </div>
          </Link> : ''}
        <div className="content-wrapper">
          <Link
            to={url}
            className={inStock ? "link-in-stock" : "link-out-of-stock"}
          >
            {!inStock ?
              <div className="out-of-stock">
                OUT OF STOCK
              </div> : ''}
            <div className="image-wrapper">
              <img
                className={inStock ? "image" : "image-oos"}
                src={gallery[0]}
                alt="item"
              />
            </div>
            <div className="text-wrapper">
              <div className="item-name">
                {`${brand} ${name}`}
              </div>
              <div className="price">
                {currencySymbol(currency) + prices
                  .find(p => p.currency === currency).amount.toFixed(2)}
              </div>
            </div>
          </Link>
        </div>
      </div>
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