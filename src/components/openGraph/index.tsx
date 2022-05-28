import Head from 'next/head'
import React from 'react'

interface IProps {
  title: string
  ogtitle: string
  description: string
  url: string
  img: string
  keywords: string
  domain: string
}

const OpenGraph = ({
  title,
  ogtitle,
  description,
  url,
  img,
  keywords,
  domain
}: IProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />

      <meta property='og:type' content='website' />
      <meta property='og:title' content={ogtitle} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={img} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={ogtitle} />
      <meta name='twitter:description' content={description} />
      <meta property='twitter:domain' content={domain} />
      <meta property='twitter:url' content={url} />
      <meta name='twitter:image' content={img} />
      <meta property='og:image:width' content='400' />
      <meta property='og:image:height' content='300' />
    </Head>
  )
}

export default OpenGraph
