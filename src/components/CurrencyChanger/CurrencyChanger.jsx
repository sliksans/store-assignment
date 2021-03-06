import { PureComponent } from 'react';
import { IoIosArrowDown } from 'react-icons/io'
import { connect } from 'react-redux'
import { Query } from '@apollo/client/react/components'
import getCurrenciesQuery from '../../queries/getCurrenciesQuery';
import { setCurrency } from '../../redux/Shopping/shopping-actions';
import { currencySymbol } from '../../util';
import './styles.css'

export class CurrencyChanger extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
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
      this.setState({ isOpen: false })
    }
  }

  openClose = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { setWrapperRef, openClose } = this
    const { currency, setCurrency } = this.props
    const { isOpen } = this.state

    return (
      <Query query={getCurrenciesQuery}>
        {({ data, loading }) => {
          if (loading)
            return ''

          return (
            <div className="currency-icon-wrapper" ref={setWrapperRef}>
              <div
                className="currency-button"
                onClick={openClose}
              >
                {currency}
              </div>
              <IoIosArrowDown
                className={`arrow ${isOpen ? "rotate" : null}`}
                onClick={openClose}
              />
              {isOpen && <div className="currency-overlay">
                {data.currencies.map((currency, id) =>
                  <div onClick={() => {setCurrency(currency); openClose();}} key={id}>
                    {currencySymbol(currency) + ' ' + currency}
                  </div>
                )}
              </div>}
            </div>
          )
        }}
      </Query>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.shop.currency
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currency) => dispatch(setCurrency(currency)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyChanger);