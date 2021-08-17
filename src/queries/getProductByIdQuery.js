import { gql } from '@apollo/client';

const getProductByIdQuery = (id) => gql`
{
  product(id: "${id}") {
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
`

export default getProductByIdQuery