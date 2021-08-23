import { PureComponent } from 'react';
import CategoryPageItem from '../../CategoryPageItem/CategoryPageItem';
import getProductsByCategoryQuery from '../../../queries/getProductsByCategoryQuery';
import getProductsQuery from '../../../queries/getProductsQuery'
import { Query } from '@apollo/client/react/components'
import './styles.css'

export class CategoryPage extends PureComponent {

  render() {
    const category = this.props.match.params.category
    const query = category !== 'all' ?
      getProductsByCategoryQuery(category) : getProductsQuery

    return (
      <div>
        <div className="category-name">
          <div>
            {category.toUpperCase()}
          </div>
        </div>
        <div className="category-page-item-wrapper">
          <Query query={query}>
            {({ data, loading, error }) => {
              if (loading)
                return <h2>Loading</h2>

              if (error)
                return <h2>{error.message}</h2>

              return (
                data.category.products
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

export default CategoryPage;
