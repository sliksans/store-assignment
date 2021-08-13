import { gql } from '@apollo/client';

const getCurrenciesQuery = gql`
{
  currencies
}
`

export default getCurrenciesQuery