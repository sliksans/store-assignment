import { PureComponent } from 'react';
import CartButton from '../CartButton/CartButton';
import CurrencyChanger from '../CurrencyChanger/CurrencyChanger';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../../assets/logo.png';
import './styles.css'

export class Header extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      cartItemCount: 0,
      categories: ['all', 'clothes', 'tech'],
      currentCategory: ''
    }
  }

  componentDidMount() {
    this.setCurrentCategory()
  }

  componentDidUpdate() {
    const totalCount = Object.values(this.props.cart)
      .reduce((t, { qty }) => t + qty, 0)

    this.setState({ cartItemCount: totalCount, })
    this.setCurrentCategory()
  }

  setCurrentCategory = () => {
    const { location } = this.props
    var category = location.pathname.substring(1)

    this.setState({ currentCategory: category })
  }

  render() {
    const { categories, currentCategory, cartItemCount } = this.state

    return (
      <header className="App-header">
        <div className="nav-bar">
          {categories.map((category, id) => (
            <Link
              to={`/${category}`}
              className={currentCategory === category ? "link-selected" : "link"}
              key={id}
            >
              <div>{category.toUpperCase()}</div>
            </Link>
          ))}
        </div>
        <img className="shop-icon" src={logo} alt="logo" />
        <div className="header-button-wrapper">
          <CurrencyChanger />
          <CartButton quantity={cartItemCount} />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart
  }
}

export default connect(mapStateToProps)(withRouter(Header));