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
      allCategories: ['clothes', 'tech'],
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

    return (
      <header className="App-header">
        <div className="nav-bar">
          {this.state.allCategories.map((category, id) => (
            <Link
              to={`/${category}`}
              className={this.state.currentCategory === category ? "nav-bar-link-selected" : "nav-bar-link"}
              key={id}
            >
              <div>{category.toUpperCase()}</div>
            </Link>
          ))}
        </div>
        <img className="shop-icon" src={logo} alt="logo" />
        <div className="header-button-wrapper">
          <CurrencyChanger />
          <CartButton quantity={this.state.cartItemCount} />
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