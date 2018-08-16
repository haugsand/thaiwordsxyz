import React from "react"
import { graphql } from "gatsby"


export default ({data}) => {

    console.log(data);

    return (
        <main>
            <h1>thaiwords.xyz</h1>

            <ul>
                 {data.allEnglishThaiWord.edges.map(({ node }, index) => (
                  <li key={index}>
                    {node.english} - {node.thai}
                  </li>
                ))}
            </ul>
        </main>
    )
}

export const query = graphql`
  query {
    allEnglishThaiWord {
      edges {
        node {
          english,
          thai
        }
      } 
    }
  }
`

