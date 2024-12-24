import styles from './Intro.module.css'

export default function Intro({ onEnterExperience }) {

    const onClickHigh = () => {
        console.log('on click high')
        onEnterExperience(1)
    }

    const onClickLow = () => {
        console.log('on click low')
        onEnterExperience(0)
    }

    return (
        <div className={styles.intro}>
            <div className={styles.introBg} />
            <p className={styles.text}>
                With over 8 billion people on Earth, Santa no longer has time to stop at every house to deliver presents.
            </p>
            <p className={styles.text}>
                Click on the ground to drop gifts as his sleigh passes through the sky, and click on the gifts to arrange them neatly under the tree—or as neatly as you can manage...
            </p>
            <div className={styles.btns}>
                <p className={styles.btn} onClick={onClickHigh}>Enter High Quality</p>
                <p className={styles.btn} onClick={onClickLow}>Enter Low Quality</p>
            </div>
        </div>
    )
}