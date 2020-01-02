import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import Layout from '../components/layout'
import Header from '../components/header'
import Container from '../components/container'

class Spotify2019 extends React.Component {
  /**
   * Setup our state defaults
   */
  constructor(props) {
    super(props)
    this.state = {
      isRecordOpen: false,
    }
  }

  /**
   * Handle the record state
   */
  openRecord = e => {
    /** 1. Toggle the state of the record (open or closed) */
    const { isRecordOpen } = { ...this.state }
    this.setState({
      isRecordOpen: !isRecordOpen,
    })
    /** 2. 'Pick up' the record (mainly for desktop) */
    /** 3. 'Open' the record (view tracks) */

    console.log(isRecordOpen)
  }

  render() {
    /**
     * Set a few variables to save our breath a bit
     */
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    /**
     * Create our record crate
     */
    const Crate = styled.div`
      ${tw`mb-4`}
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: 1fr;

      @media (min-width: 440px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 768px) {
        ${tw`mt-4 mb-12`}
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2rem;
      }
    `

    /**
     * Create our individual records using our graphql data
     */
    const Record = meta => (
      /** First let's create the record itself and give it a bit of 3D-ness */
      <div
        onClick={this.openRecord}
        onKeyPress={this.openRecord}
        role="button"
        tabIndex="0"
        aria-pressed="false"
        aria-label="Open Record"
        css={css`
          transform: perspective(0) rotateY(0);

          @media (min-width: 768px) {
            position: relative;
            transform: perspective(150px) rotateY(1deg) scale(1);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transition: 50ms ease-in-out all;
            will-change: all;
            cursor: pointer;
          }

          &:focus {
            bottom: 1rem;
            outline: none;
          }

          &:hover {
            transform: scale(1);
            box-shadow: inherit;
            z-index: inherit;

            @media (min-width: 768px) {
              transform: perspective(0) rotateY(0deg) scale(1.1);
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
              z-index: 999;
            }

            & span {
              opacity: 0;
            }
          }
        `}
      >
        {/** Add a spine, adjust the perspective (weird number) and give it a muted colour */}
        <span
          css={css`
            display: none;

            @media (min-width: 768px) {
              display: block;
              position: absolute;
              top: 0;
              left: -11px;
              width: 15px;
              height: 100%;
              background: #555;
              transform: perspective(2170px) rotateY(-63deg);
              z-index: -1;
              transition: 50ms ease-in-out opacity;
            }
          `}
        ></span>

        {/** The album name */}
        <h2
          css={css`
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            color: #fff;
            font-size: 0.875rem;
            z-index: 5;
          `}
        >
          <strong>Tracks of the Month</strong>
          <br />
          {meta.playlistName}
        </h2>

        {/** Add a Spotify logo for legit-ness */}
        <h3
          css={css`
            position: absolute;
            top: 1rem;
            left: 1rem;
            width: 75px;
            z-index: 10;
          `}
        >
          <Img fluid={data.file.childImageSharp.fluid} />
        </h3>
        <Img fluid={meta.coverArt} />
      </div>
    )

    return (
      <Layout>
        {/**
         * Set some meta data
         */}
        <Helmet>
          <title>Spotify 2019 &mdash; {siteTitle}</title>
        </Helmet>

        {/**
         * The main page header
         */}
        <Header siteTitle={siteTitle} />

        {/**
         * Here we render out the records
         */}
        <section>
          <Container>
            <Crate>
              {data.allSpotifyPlaylist.edges.map(({ node }, index) => (
                <Record
                  key={index}
                  coverArt={node.image.localFile.childImageSharp.fluid}
                  playlistName={node.name}
                  isRecordOpen={this.state.isRecordOpen}
                />
              ))}
            </Crate>
          </Container>
        </section>
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    allSpotifyPlaylist(
      limit: 12
      filter: { name: { regex: "/2019/" } }
      sort: { fields: order }
    ) {
      edges {
        node {
          name
          spotifyId
          external_urls {
            spotify
          }
          order
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1280) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }

    file(name: { regex: "/spotify_logo/" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default Spotify2019
