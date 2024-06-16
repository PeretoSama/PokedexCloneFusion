import React from 'react'
import styles from './FusionSection.module.css'

import SvgCustom from './SvgCustom'
function FusionSection ({ fusionCards, submitbutton }) {
  return (
    <>
      <div className={styles.fusionSection}>
        {fusionCards.unknown1}
        <div className={styles.fusionBody}>
          <div className={styles.fusionButtonWrapper}>
            <SvgCustom className={styles.rotateRight} type='fuseIcon' cWidth={50} />
            <SvgCustom type='pokeball' cWidth={50} />
            <input type='button' value='' id={styles.fusionButton} onClick={submitbutton} />
            <SvgCustom className={styles.rotateLeft} type='fuseIcon' cWidth={50} />
          </div>
          <h4>Drag and drop and press the button to fuse Pokemons!</h4>
        </div>
        {fusionCards.unknown2}
      </div>

    </>
  )
}

export default FusionSection
