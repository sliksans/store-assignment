import { PureComponent } from 'react';
import ProductPageGallery from '../../ProductPageGallery/ProductPageGallery';
import AttributePicker from '../../AttributePicker/AttributePicker';
import { connect } from 'react-redux'
import { addToCart, setCurrentItem } from '../../../redux/Shopping/shopping-actions'
import { Query } from '@apollo/client/react/components'
import getProductByIdQuery from '../../../queries/getProductByIdQuery'
import { currencySymbol } from '../../../util';
import sanitizeHtml from 'sanitize-html';
import './styles.css'

export class ProductPage extends PureComponent {

  productHasAttributes(product) {
    return product.attributes.length > 0
  }

  allAttributesChosen(product) {
    return this.productHasAttributes(product) ?
      this.props.currentProduct.attributes.every(item => item.chosenAttribute) : true
  }

  buttonText(product) {
    return product.inStock ?
      (this.allAttributesChosen(product) ?
        "ADD TO CART" : "PLEASE SELECT PRODUCT OPTIONS") : "OUT OF STOCK"
  }

  buttonClassName(product) {
    return product.inStock && this.allAttributesChosen(product) ?
      "add-to-cart" : "add-to-cart-disabled"
  }

  buttonDisabled(product) {
    return !(product.inStock && this.allAttributesChosen(product))
  }

  render() {

    const { currentProduct, setCurrentProduct, addToCart, currency } = this.props
    const productId = this.props.match.params.id

    return (
      <Query query={getProductByIdQuery(productId)}>
        {({ data, loading }) => {
          if (loading)
            return <div>Loading</div>

          const product = data.product
          const { gallery, brand, name, attributes, prices, description } = product

          if (!this.productHasAttributes(product))
            setCurrentProduct(product)

          return (
            <div className="product-page-container">
              <div className="product-page-left-half">
                <ProductPageGallery gallery={gallery} />
              </div>
              <div className="product-page-right-half">
                <div className="brand">{brand}</div>
                <div className="name">{name}</div>
                {attributes.map((attribute, id) =>
                  <AttributePicker
                    attribute={attribute}
                    product={product}
                    key={id}
                  />)}
                <div className="product-page-price">
                  <div>
                    PRICE:
                  </div>
                  <div className="product-page-price-raleway">
                    {currencySymbol(currency) + prices
                      .find(p => p.currency === currency).amount.toFixed(2)}
                  </div>
                </div>
                <button
                  className={this.buttonClassName(product)}
                  onClick={() => addToCart(currentProduct)}
                  disabled={this.buttonDisabled(product)}
                >
                  {this.buttonText(product)}
                </button>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}
                >
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
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
    addToCart: (item) => dispatch(addToCart(item)),
    setCurrentProduct: (item) => dispatch(setCurrentItem(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);