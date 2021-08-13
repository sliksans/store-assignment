import './styles.css'
import { PureComponent } from 'react';

export class ProductPageGallery extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentImage: this.props.gallery[0]
    }
  }

  setCurrentImage = (src) => {
    this.setState({
      currentImage: src
    })
  }

  render() {
    const { gallery } = this.props
    const { currentImage } = this.state

    return (
      <div className="image-container">
        <div className="small-image-container">
          {gallery.length > 1 ? gallery.map((image, id) =>
            <img
              className="small-image"
              src={image}
              alt="small"
              onClick={() => this.setCurrentImage(image)}
              key={id}
            />
          ) : ''}
        </div>
        <div className="big-image-container">
          <img
            className="big-image"
            src={currentImage}
            alt="big"
          />
        </div>
      </div>
    )
  }
}

export default ProductPageGallery;