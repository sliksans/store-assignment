import { PureComponent } from 'react';
import CategoryPageItem from '../../CategoryPageItem/CategoryPageItem';
import { connect } from 'react-redux'
import getProductsQuery from '../../../queries/getProductsQuery';
import { Query } from '@apollo/client/react/components'
import './styles.css'

export class CategoryPage extends PureComponent {

  render() {
    return (
      <div>
        <div className="category-name">
          <h2>
            {this.props.match.params.category.toUpperCase()}
          </h2>
        </div>
        <div className="category-page-item-wrapper">
          <Query query={getProductsQuery}>
            {({ data, loading, error }) => {
              if (loading)
                return <>Loading</>

              if (error)
                return <>{error.message}</>

              return (
                data.category.products.filter(product => product.category === this.props.match.params.category)
                  .map((product) => (
                    <CategoryPageItem key={product.id} productData={product} />
                  )))
            }}
          </Query>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.shop.products
  }
}

export default connect(mapStateToProps)(CategoryPage);
