import { PureComponent } from 'react';
import ProductPageGallery from '../../ProductPageGallery/ProductPageGallery';
import AttributePicker from '../../AttributePicker/AttributePicker';
import { connect } from 'react-redux'
import { addToCart, setCurrentItem } from '../../../redux/Shopping/shopping-actions'
import { Query } from '@apollo/client/react/components'
import getProductsQuery from '../../../queries/getProductsQuery';
import { currencySymbol } from '../../../util';
import './styles.css'

export class ProductPage extends PureComponent {

  render() {

    const { currentProduct, setCurrentProduct, currency } = this.props

    return (
      <Query query={getProductsQuery}>
        {({ data, loading }) => {
          if (loading)
            return <div>Loading</div>

          const product = data.category.products.find(product => product.id === this.props.match.params.id)

          const productHasAttributes = product.attributes.length ? true : false

          if (!productHasAttributes)
            setCurrentProduct(product)

          const allAttributesChosen = productHasAttributes ? currentProduct.attributes
            .every(item => item.chosenAttribute) : true

          const addToCartButtonText = product.inStock ?
            (allAttributesChosen ? "ADD TO CART" : "PLEASE SELECT PRODUCT OPTIONS") : "OUT OF STOCK"

          return (
            <div className="product-page-container">
              <div className="product-page-left-half">
                <ProductPageGallery gallery={product.gallery} />
              </div>
              <div className="product-page-right-half">
                <h2>{product.name}</h2>
                {product.attributes.map((attribute, id) =>
                  <AttributePicker attribute={attribute} product={product} key={id} />)}
                <div className="product-page-price">
                  <div>
                    PRICE:
                  </div>
                  <div className="product-page-price-raleway">
                    {currencySymbol(currency) + product.prices.find(p => p.currency === currency).amount.toFixed(2)}
                  </div>
                </div>
                <button
                  className={product.inStock && allAttributesChosen ? "add-to-cart" : "add-to-cart-disabled"}
                  onClick={() => this.props.addToCart(this.props.currentProduct)}
                  disabled={!(product.inStock && allAttributesChosen)}
                >
                  {addToCartButtonText}
                </button>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: product.description }}
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