import './style.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const created = ({ gl }) =>
{
    gl.setClearColor('#000826', 1)
}

root.render(
    <StrictMode>
        <Canvas
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 0, 1, 16 ]
            } }
            onCreated={ created }
        >
            <Experience />
        </Canvas>
    </StrictMode>
)