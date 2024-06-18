import React from 'react'
import styles from './PreviewCard.module.css'
import typeIcons from '../assets/typesIcons/typesIcons.js'
import TypesIcon from './TypesIcon.jsx'

function PreviewCard ({ isFusion, imgSrc, pokemonId, pokeName, types, fusionId, onDragStartFunc, onDropF, isFusionResult }) {
  let typesJsx = [<TypesIcon key={0} imgUrl='' name='unknown' isCheckbox={false} />,
    <TypesIcon key={1} imgUrl='' name='unknown' isCheckbox={false} />]
  if (types) {
    typesJsx = []
    types.forEach((element, index) => {
      typesJsx.push(<TypesIcon key={index} imgUrl={typeIcons[element]} name={element} isCheckbox={false} />)
    })
  }

  let previewCorrect = ''
  if (isFusion) {
    previewCorrect = (
      <div
        className={styles.cardWrapper}
        id={fusionId}
        onDrop={onDropF}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className={styles.pokemonPreview}>
          <div className={`${styles.circle} ${types ? styles[types[0]] : ''}`} />
          <img src={imgSrc || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/0.png'} alt='' />
          <img src={types ? typeIcons[types[0]] : typeIcons.normal} alt='' />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.nameWrapper}>
            <h4>Nº {pokemonId || fusionId}</h4>
            <h2>{pokeName}</h2>
          </div>
          <div className={styles.bodyTypes}>
            {typesJsx}
          </div>
        </div>
      </div>
    )
  } else {
    previewCorrect = (
      <div className={styles.cardWrapper} id={pokemonId} draggable onDragStart={onDragStartFunc}>
        <div className={styles.pokemonPreview}>
          <div className={`${styles.circle} ${types ? styles[types[0]] : ''}`} />
          <img src={imgSrc} alt='' />
          <img src={types ? typeIcons[types[0]] : ''} alt='' />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.nameWrapper}>
            <h4>Nº {pokemonId.toString().padStart(4, '0')}</h4>
            <h2>{pokeName}</h2>
          </div>
          <div className={styles.bodyTypes}>
            {typesJsx}
          </div>
        </div>
      </div>
    )
  }
  if (isFusionResult) {
    previewCorrect = (
      <div className={styles.cardWrapper} id={pokemonId}>
        <div className={styles.pokemonPreview}>

          <img src={imgSrc || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/0.png'} alt='' />

        </div>
        <div className={styles.cardBody}>
          <div className={styles.nameWrapper}>
            <h4>Nº {pokemonId.toString().padStart(4, '0')}</h4>
            <h2>{pokeName}</h2>
          </div>
          <div className={styles.bodyTypes}>
            {typesJsx}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {previewCorrect}
    </>
  )
}

export default PreviewCard
