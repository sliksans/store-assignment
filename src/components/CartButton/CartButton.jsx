import { PureComponent } from 'react';
import { FiShoppingCart } from 'react-icons/fi'
import CartOverlay from '../CartOverlay/CartOverlay';
import { connect } from 'react-redux';
import { openCloseOverlay } from '../../redux/Shopping/shopping-actions';
import './styles.css'

export class CartButton extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      cartItemCount: 0
    }

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.openCloseOverlay(false)
    }
  }

  render() {

    const { overlayIsOpen, openCloseOverlay, quantity } = this.props

    return (
      <div className="cart-button" ref={this.setWrapperRef}>
        <div
          className="cart-icon"
          onClick={() => openCloseOverlay(!overlayIsOpen)}
        >
          <FiShoppingCart />
          <div className={quantity ? "item-quantity" : "item-quantity-invisible"}>
            {quantity}
          </div>
        </div>
        {overlayIsOpen &&
          <CartOverlay close={() => openCloseOverlay(false)}/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    overlayIsOpen: state.shop.overlayIsOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openCloseOverlay: (value) => dispatch(openCloseOverlay(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartButton)