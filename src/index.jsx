import '@/assets/styles/reset.css'
import '@/assets/styles/fonts.css'
import './style.css'

import { StrictMode, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import Intro from './Intro/Intro.jsx'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const App = () => {
    const [showIntro, setShowIntro] = useState(true)
    const [quality, setQuality] = useState(1)

    const handleIntroClick = (quality) => {
        setQuality(quality)
        setShowIntro(false)
        console.log('quality chosen')
    }
    
    const created = ({ gl }) =>
    {
        gl.setClearColor('#000826', 1)
    }
    
    const urlParams = new URLSearchParams(window.location.search)
    let isDebugMode = false

    if (urlParams.get('debug') === 'true') {
        isDebugMode = true
        setShowIntro(false)
    }
    
    return (
        <StrictMode>
            {showIntro && <Intro onEnterExperience={handleIntroClick} />}
            <Canvas
                dpr={ [ 1, 2 ] }
                camera={ {
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [ 0, 2.75, 15 ]
                } }
                onCreated={ created }
            >
                <Experience showIntro={showIntro} quality={quality} debug={isDebugMode}/>
            </Canvas>
            <Leva
                hidden={!isDebugMode}
            />
        </StrictMode>
    )
}

root.render(<App />)