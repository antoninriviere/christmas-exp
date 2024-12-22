import { ToneMapping, Vignette, EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction, ToneMappingMode } from 'postprocessing'

export default function Postprocessing() {
    return <>
        <EffectComposer>
            <ToneMapping mode={ ToneMappingMode.ACES_FILMIC } />
            <Bloom luminanceThreshold={ 0 } mipmapBlur intensity={ 2 } />
            <Vignette
                offset={ 0.3 }
                darkness={ 0.9 }
                blendFunction={ BlendFunction.NORMAL }
            />
        </EffectComposer>
    </>
}