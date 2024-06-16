import React from 'react'
import styles from './FusionModal.module.css'
function FusionModal ({ pokeModalInfo, setModalOff, allowCloseModal }) {
  return (
    <div className={styles.fusionModal}>
      <img src={pokeModalInfo.img1} alt='Fusion 1' />
      <img src={pokeModalInfo.img2} alt='Fusion 2' />
      <img src={pokeModalInfo.img3} alt='Fusion 3' />
      <img src={pokeModalInfo.img4} alt='Fusion 4' />
      {allowCloseModal ? (<input type='button' value='' onClick={setModalOff} />) : ''}
    </div>
  )
}

export default FusionModal
