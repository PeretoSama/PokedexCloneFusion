import styles from './FusionModal.module.css'
import PreviewCard from './PreviewCard'
function FusionModal ({ pokeModalInfo, setModalOff, allowCloseModal, fusionCards }) {
  console.log('Fusionmodal', pokeModalInfo)
  let fusions

  function GetTypes () {
    const types = []
    const types1 = fusionCards.unknown1.props.types
    const types2 = fusionCards.unknown2.props.types
    if (types1.length === 1) {
      types.push(types1[0])
    } else if (types1.length === 2) {
      const randomIndex = Math.floor(Math.random() * types1.length)
      types.push(types1[randomIndex])
    }
    if (types2.length === 1) {
      types.push(types2[0])
    } else if (types2.length === 2) {
      const randomIndex = Math.floor(Math.random() * types2.length)
      types.push(types1[randomIndex])
    }
    return types
  }
  function shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]] // Swap elements
    }

    return array
  }

  if (pokeModalInfo.images) {
    fusions = pokeModalInfo.images.map((element, index) => {
      const types = GetTypes()
      const finalTypes = shuffleArray(types)
      if (element) { console.log('element url', element.url) }
      return (
        <PreviewCard isFusionResult imgSrc={element.url} pokemonId='Unknown ID' key={'Fusion' + index} pokeName={pokeModalInfo.names[index]} types={finalTypes} />
      )
    })
  }

  console.log('FUUUUU', fusions)

  return (
    <div className={styles.fusionModal}>
      {fusions}
      {allowCloseModal
        ? (
          <div className={styles.closeWrapper}>
            <input type='button' value='X' onClick={setModalOff} className={styles.close} />
          </div>)
        : ''}
    </div>
  )
}

export default FusionModal
