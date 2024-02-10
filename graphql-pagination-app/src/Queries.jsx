import { gql } from "@apollo/client";

export const Get_Films = gql`
query Query($after: String, $before: String, $first: Int, $last: Int) {
  allFilms(after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      hasNextPage
      endCursor
    }
    films {
      title
      director
      releaseDate
      speciesConnection {
        species {
          name
          classification
          homeworld {
            name
          }
        }
      }
    }
  }
}
`;
