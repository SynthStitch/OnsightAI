import { useEffect, useState } from 'react'
import Landing from './Landing'
import Demo from './Demo'

// ponytail: hash routing, two pages don't need a router lib
export default function App() {
  const [hash, setHash] = useState(location.hash)
  useEffect(() => {
    const onChange = () => { setHash(location.hash); if (location.hash.startsWith('#/')) scrollTo(0, 0) }
    addEventListener('hashchange', onChange)
    return () => removeEventListener('hashchange', onChange)
  }, [])
  return hash.startsWith('#/demo') ? <Demo /> : <Landing />
}
