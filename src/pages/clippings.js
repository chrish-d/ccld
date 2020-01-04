import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Header from '../components/header'
import Container from '../components/container'
import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export default () => {
  return (
    <Layout>
      <Header pageTitle="Clippings" />
      <section>
        <Container>
          <h1
            css={tw`
                text-xl
                mt-4
                mb-4
              `}
          >
            Clippings
          </h1>

          <hr css={tw`mb-8`} />

          <ul>
            <li>
              <Link to="/clippings/typography">Typography</Link>
            </li>
          </ul>
        </Container>
      </section>
    </Layout>
  )
}
