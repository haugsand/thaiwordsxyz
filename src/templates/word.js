import React from "react";
import { Link, graphql } from "gatsby";

export default ({ data }) => {
    const word = data.englishThaiWord;

    return (
        <main>
            <Link to="/">Back</Link>
            <h1>
                {word.english} - {word.thai}
            </h1>
        </main>
    );
};

export const query = graphql`
    query($slug: String!) {
        englishThaiWord(slug: { eq: $slug }) {
            english
            thai
        }
    }
`;
