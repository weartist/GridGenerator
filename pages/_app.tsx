import '@/styles/globals.css'
import '@/styles/card.css'

import '@/styles/music.css'
import '@/styles/menu.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
