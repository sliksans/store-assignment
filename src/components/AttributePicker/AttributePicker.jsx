import { PureComponent } from 'react';
import { connect } from 'react-redux'
import { setCurrentItem } from '../../redux/Shopping/shopping-actions'
import './styles.css'

export class AttributePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      chosenAttribute: ''
    };
  }

  setChosenAttribute = (id) => {
    const { currentProduct, attribute, inCart } = this.props

    if (inCart)
      return

    this.setState({
      chosenAttribute: id
    })

    const updatedAttributes = currentProduct.attributes
      .map(item => item.name === attribute.name ?
        { ...item, chosenAttribute: id } : item
      )

    const updatedProduct =
      { ...currentProduct, attributes: updatedAttributes }

    this.props.setCurrentItem(updatedProduct)
  }

  componentDidMount() {
    const { product, setCurrentItem, inCart } = this.props

    if (!inCart)
      setCurrentItem(product)
  }

  render() {

    const { inCart, attribute } = this.props
    const { id, name, items, type } = attribute
    const { chosenAttribute } = this.state

    

    return (
      <div className="attribute-container" key={id}>
        {!inCart ? name.toUpperCase() + ':' : ''}
        <div className={inCart ? "button-container-disabled" : ""}>
          {items.map((item, id) => ( 
            <button
              onClick={() => this.setChosenAttribute(item.id)}
              className={attribute.chosenAttribute === item.id ||
                chosenAttribute === item.id ? "chosen-attribute" : ""}
              style={type === 'swatch' ? { backgroundColor: item.value } : {}}
              key={id}
            >
              {type !== 'swatch' ? item.value : ''}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentProduct: state.shop.currentItem,
    cart: state.shop.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentItem: (item) => dispatch(setCurrentItem(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttributePicker);