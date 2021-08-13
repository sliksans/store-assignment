import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { PureComponent } from 'react';
import Header from './components/Header/Header';
import CategoryPage from './components/pages/CategoryPage/CategoryPage';
import ProductPage from './components/pages/ProductPage/ProductPage';
import CartPage from './components/pages/CartPage/CartPage';
import { connect } from 'react-redux';
import './App.css';

export class App extends PureComponent {

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            {this.props.overlayIsOpen ?
              <div className="cart-overlay-background"></div> : ''}
            <Switch>
              <Route exact path="/">
                <Redirect to="/clothes" />
              </Route>
              <Route exact path='/cart' component={CartPage} />
              <Route exact path='/:category' component={CategoryPage} />
              <Route exact path='/:category/:id' component={ProductPage} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    overlayIsOpen: state.shop.overlayIsOpen
  }
}

export default connect(mapStateToProps)(App);
