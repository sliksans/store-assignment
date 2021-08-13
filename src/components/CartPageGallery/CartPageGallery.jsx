import './styles.css'
import { IoIosArrowDown } from 'react-icons/io'
import { PureComponent } from 'react';

export class CartPageGallery extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentImageId: 0
    }
  }

  forward() {
    const { currentImageId } = this.state

    const id = currentImageId === this.props.gallery.length - 1 ?
      0 : currentImageId + 1

    this.setState({ currentImageId: id })
  }

  backward() {
    const { currentImageId } = this.state

    const id = currentImageId === 0 ?
      this.props.gallery.length - 1 : currentImageId - 1

    this.setState({ currentImageId: id })
  }

  render() {
    const { gallery } = this.props
    const { currentImageId } = this.state

    return (
      <div className="cart-page-image-container">
        <img
          className="image"
          src={gallery[currentImageId]}
          alt="big"
        />
        {gallery.length > 1 ? <div>
          <div className="left-arrow" onClick={() => this.backward()}><IoIosArrowDown /></div>
          <div className="right-arrow" onClick={() => this.forward()}><IoIosArrowDown /></div>
        </div> : ''}
      </div>
    )
  }
}

export default CartPageGallery;