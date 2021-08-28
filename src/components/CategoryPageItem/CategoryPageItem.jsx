import { PureComponent } from 'react';
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addToCart, setCurrentItem } from '../../redux/Shopping/shopping-actions'
import { currencySymbol } from '../../util';
import './styles.css'

export class CategoryPageItem extends PureComponent {

  productHasAttributes() {
    return this.props.productData.attributes.length > 0
  }

  handleCartButtonClick() {
    const { productData, addToCart } = this.props

    if (this.productHasAttributes()) return

    addToCart(productData)
  }

  render() {
    const { productData, currency } = this.props
    const { category, id, inStock, gallery, brand, name, prices } = productData
    const url = `/${category}/${id}`

    return (
      <div className="item-wrapper">
        {inStock &&
          <Link
            to={this.productHasAttributes() ? url : '#'}
            onClick={() => this.handleCartButtonClick()}
          >
            <div className="item-cart-button">
              <div className="item-cart-button-icon">
                <FiShoppingCart />
              </div>
            </div>
          </Link>}
        <div className="content-wrapper">
          <Link
            to={url}
            className={inStock ? "link-in-stock" : "link-out-of-stock"}
          >
            {!inStock &&
              <div className="out-of-stock">
                OUT OF STOCK
              </div>}
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