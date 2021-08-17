import { gql } from '@apollo/client';

const getProductsByCategoryQuery = (title) => gql`
{
  category(input: { title: "${title}" }) {
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
      brand
    }
  }
}
`

export default getProductsByCategoryQuery