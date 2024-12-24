import { useState } from 'react'

import styles from './UI.module.css'

export default function UI() {
    
    const [textCredit, setTextCredit] = useState('show credits')
    const [showCredits, setShowCredits] = useState(false)

    const onClickCredits = () => {
        setShowCredits(!showCredits)

        if (showCredits) {
            setTextCredit('show credits')
        } else {
            setTextCredit('hide credits')
        }
    }

    return <>
        <div className={styles.links}>
            <div className={styles.linksInner}>
                <a className={styles.link} href="https://antonin.space" target="_blank">antonin.space</a>
                <p className={styles.separator}> | </p>
                <p className={styles.credits} onClick={onClickCredits}>{textCredit}</p>
            </div>
            {showCredits && <p className={styles.creditsText}><br />Models : Squared Christmas Gifts by Jarlan Perez [CC-BY] via Poly Pizza <br /> Pine Tree with Snow by Chris Lee [CC-BY] via Poly Pizza <br /> Christmas Tree by Alex Safayan [CC-BY] via Poly Pizza <br /> Music : Ice Dance Dany Elfman</p>}
        </div>
    </>
}