import { gql } from '@apollo/client';

const getProductsQuery = gql`
{
  category {
    products {
      id
      name
      prices {
        amount
        currency
      }
      inStock
      category
      attributes {
        name
        type
        items {
          id
          value
          displayValue
        }
      }
      description
      gallery
    }
  }
}
`

export default getProductsQuery