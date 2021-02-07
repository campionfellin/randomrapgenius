import { useEffect, useState } from 'react';
import './App.css';
import fetch from 'node-fetch';

const App = () => {

  const token = 'tgwOHu-njUlWatAIyRQRSEB0hKBweUpTHF9Cwz_MgA119iBHL73v7wXIpALVRanp'
  const min = 10000001
  const max = 19993999

  const [random, setRandom] = useState(Math.floor(Math.random() * (max - min) + min))
  const [referent, setReferent] = useState('')
  const [annotation, setAnnotation] = useState('')
  const [referentUrl, setReferentUrl] = useState('https://genius.com')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {

    const req = async () => {
      const response = await fetch(`https://api.genius.com/annotations/${random}/?access_token=${token}`);
    
      const body = await response.json();
      if (body.meta.status === 200) {
        const fragment = body.response.referent.fragment
        const words = body.response.annotation.body.dom.children?.map((child: any) => child.children).join(" ")

        if (fragment.toLowerCase().startsWith('http') && fragment.toLowerCase().endsWith('.jpg')) {
          setImageUrl(fragment)
        } else {
          setAnnotation(words)
          setReferent(fragment)
        }

        setReferentUrl(body.response.referent.url)
      } else {
        setRandom(Math.floor(Math.random() * (max - min) + min))
      }

    }

    req()
  }, [random])


  return (
    <div className="App">
      <header className="App-header">
        {imageUrl && <img src={imageUrl} className="App-logo" alt="" /> }
        {referent && <p>
          Lyrics: {referent}
        </p>}
        {annotation && <p>
          Annotation: {annotation}
        </p>}
        <a
          className="App-link"
          href={referentUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Lyrics
        </a>
      </header>
    </div>
  );
}

export default App;
