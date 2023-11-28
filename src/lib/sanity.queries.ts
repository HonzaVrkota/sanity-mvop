import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
  tags?: string[]
  showContainer?: boolean
  titleColor?: ColorFieldType
}

export interface ColorFieldType {
  hsl: Hsl
  alpha: number
  _type: string
  hex: string
  hsv: Hsv
  rgb: Rgb
}

export interface Hsl {
  a: number
  s: number
  _type: string
  h: number
  l: number
}

export interface Hsv {
  h: number
  a: number
  s: number
  v: number
  _type: string
}

export interface Rgb {
  a: number
  b: number
  r: number
  g: number
  _type: string
}
