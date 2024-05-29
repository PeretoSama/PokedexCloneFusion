import React from 'react'
import styles from './FusionSection.module.css'
import PreviewCard from './PreviewCard'
import SvgCustom from './SvgCustom'
function FusionSection ({ onDropFunction }) {
  return (
    <>
      <section className={styles.fusionSection}>
        <PreviewCard isFusion pokeName='Unknown' fusionId='unknown1' />
        <div className={styles.fusionBody}>
          <div className={styles.fusionButtonWrapper}>
            <SvgCustom className={styles.rotateRight} type='fuseIcon' cWidth={50} />
            <SvgCustom type='pokeball' cWidth={50} />
            <SvgCustom className={styles.rotateLeft} type='fuseIcon' cWidth={50} />
          </div>
          <h4>Drag and drop and press the button to fuse Pokemons!</h4>
        </div>
        <PreviewCard isFusion pokeName='Unknown' fusionId='unknown2' />
      </section>

    </>
  )
}

export default FusionSection
