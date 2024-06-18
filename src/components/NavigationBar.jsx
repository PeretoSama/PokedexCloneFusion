import styles from './NavigationBar.module.css'
import TypesIcon from './TypesIcon.jsx'
import { useEffect, useState } from 'react'
// import DropDown from './DropDown.jsx'
function NavigationBar ({ updateSearch, value, updateTypeCheckbox, updateRegionCheckBoxes, checkBoxs, generations }) {
  const [typeToggleState, setTypeToggleState] = useState(false)
  const [regionToggleState, setRegionToggleState] = useState(false)
  useEffect(() => {
  }, [typeToggleState, regionToggleState])

  return (
    <div className={styles.navigationBar}>
      <input type='text' value={value || ''} id={styles.searchInput} onChange={updateSearch} placeholder='Search...' />
      <div className={styles.filters}>
        <div className={styles.toggleWrapper}>
          <input checked={typeToggleState} onChange={() => { setTypeToggleState((prevstate) => { return !prevstate }) }} type='checkbox' className={styles.typesToggle} name='typesToggle' id='typesToggle' />
          <label htmlFor='typesToggle' className={styles.typesToggleLabel}>Types</label>
        </div>
        <div className={styles.toggleWrapper}>
          <input checked={regionToggleState} onChange={() => { setRegionToggleState((prevstate) => { return !prevstate }) }} type='checkbox' className={styles.typesToggle} name='regionToggle' id='regionToggle' />
          <label htmlFor='regionToggle' className={styles.regionToggleLabel}>Regions</label>
        </div>
        <div className={styles.dropDownWrapper}>
          TEST
        </div>
      </div>
      <div className={`${styles.checkBoxWrapper} ${typeToggleState ? styles.show : ''}`}>
        <TypesIcon name='bug' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='dark' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='dragon' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='electric' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='fairy' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='fighting' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='fire' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='flying' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='ghost' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='grass' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='ground' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='ice' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='normal' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='poison' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='psychic' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='rock' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='steel' isCheckbox onCheckChange={updateTypeCheckbox} />
        <TypesIcon name='water' isCheckbox onCheckChange={updateTypeCheckbox} />

      </div>
      <div className={`${styles.regionWrapper} ${regionToggleState ? styles.show : ''}`}>
        <TypesIcon name={generations.generation1.region} size='small' isCheckbox onCheckChange={updateRegionCheckBoxes} isRegion />
        <TypesIcon name={generations.generation2.region} size='small' isCheckbox onCheckChange={updateRegionCheckBoxes} isRegion />
        <TypesIcon name={generations.generation3.region} size='small' isCheckbox onCheckChange={updateRegionCheckBoxes} isRegion />
        <TypesIcon name={generations.generation4.region} size='small' isCheckbox onCheckChange={updateRegionCheckBoxes} isRegion />
        <TypesIcon name={generations.generation5.region} size='small' isCheckbox onCheckChange={updateRegionCheckBoxes} isRegion />
        <TypesIcon name={generations.generation6.region} size='small' isCheckbox onCheckChange={updateRegionCheckBoxes} isRegion />
        <TypesIcon name={generations.generation7.region} size='small' isCheckbox onCheckChange={updateRegionCheckBoxes} isRegion />
        <TypesIcon name={generations.generation8.region} size='small' isCheckbox onCheckChange={updateRegionCheckBoxes} isRegion />
        <TypesIcon name={generations.generation9.region} size='small' isCheckbox onCheckChange={updateRegionCheckBoxes} isRegion />

      </div>

    </div>
  )
}

export default NavigationBar
