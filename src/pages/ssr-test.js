import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import Layout from "../layouts";
import { rhythm } from "../utils/typography";

const ImageAPI = (props) => {
  const assets = props.data.allContentfulAsset.edges;
  return (
    <Layout>
      <div
        style={{
          margin: `0 auto`,
          marginTop: rhythm(1.5),
          marginBottom: rhythm(1.5),
          maxWidth: 650,
          paddingLeft: rhythm(3 / 4),
          paddingRight: rhythm(3 / 4),
        }}
      >
        <h1>Image API examples</h1>
        <pre>{JSON.stringify(props.serverData, null, 2)}</pre>
        <p>
          Gatsby offers rich integration with
          {` `}
          <a href="https://www.contentful.com/developers/docs/references/images-api/">
            {`Contentful's Image API`}
          </a>
        </p>
        <p>
          Images can be display with three different layouts. Learn more about
          them in the{` `}
          <a href="https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#layout">
            reference of gatsby-plugin-image
          </a>
        </p>
        <ul>
          <li>
            <a href="#constrained">Constrained</a>
          </li>
          <li>
            <a href="#fixed">Fixed</a>
          </li>
          <li>
            <a href="#full-width">Full width</a>
          </li>
        </ul>
        <p>
          All placeholder variants are supported as well. See more at the
          <a href="https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#placeholder">
            reference of gatsby-plugin-image
          </a>
        </p>
        <ul>
          <li>
            <a href="#blurred">Blurred</a>
          </li>
          <li>
            <a href="#traced">Traced SVG</a>
          </li>
        </ul>
        <h2 id="traced">Constrained</h2>
        <p>
          This is the default layout. It displays the image at the size of the
          source image, or you can set a maximum size by passing in{` `}
          <strong>width</strong> or
          <strong>height</strong>). If the screen or container size is less than
          the width of the image, it scales down to fit, maintaining its aspect
          ratio. It generates smaller versions of the image so that a mobile
          browser doesn’t need to load the full-size image.
        </p>
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(3, minmax(0, 1fr))`,
            gap: rhythm(1),
          }}
        >
          {assets.map(({ node: { id, title, constrained } }) => (
            <div key={id}>
              <GatsbyImage
                image={constrained}
                alt={title}
                style={{ border: `1px solid red` }}
              />
            </div>
          ))}
        </div>
        <h4>GraphQL query</h4>
        <pre style={{ background: `#efeded`, padding: rhythm(3 / 4) }}>
          <code
            dangerouslySetInnerHTML={{
              __html: `{
  allContentfulAsset {
    edges {
      node {
        title
        constrained: gatsbyImage(
            width: 768
            height: 360
            layout: CONSTRAINED
            placeholder: NONE
            quality: 80
            backgroundColor: "#F5F5F5"
            cropFocus: CENTER
          )
      }
    }
  }
}`,
            }}
          />
        </pre>
      </div>
    </Layout>
  );
};

export default ImageAPI;

export const pageQuery = graphql`
  query {
    allContentfulAsset(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          title
          id
          constrained: gatsbyImage(
            width: 768
            height: 360
            layout: CONSTRAINED
            placeholder: NONE
            quality: 80
            backgroundColor: "#F5F5F5"
            cropFocus: CENTER
          )
        }
      }
    }
    debugVars
  }
`;

export const getServerData = () => {
  return {
    props: {
      ssr: true,
    },
  };
};
