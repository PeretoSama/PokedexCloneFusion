import styles from './NavigationBar.module.css'
import typeIcons from '../assets/typesIcons/typesIcons.js'
import TypesIcon from './TypesIcon.jsx'
import { useEffect, useState } from 'react'
function NavigationBar ({ updateSearch, value, updateCheckBox, checkBoxs }) {
  const [typeToggleState, setTypeToggleState] = useState(false)
  const [regionToggleState, setRegionToggleState] = useState(false)
  useEffect(() => {
    console.log('Type', typeToggleState, regionToggleState)
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
      </div>
      <div className={`${styles.checkBoxWrapper} ${typeToggleState ? styles.show : ''}`}>
        <TypesIcon imgUrl={typeIcons.bug} name='bug' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.dark} name='dark' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.dragon} name='dragon' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.electric} name='electric' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.fairy} name='fairy' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.fighting} name='fighting' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.fire} name='fire' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.flying} name='flying' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.ghost} name='ghost' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.grass} name='grass' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.ground} name='ground' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.ice} name='ice' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.normal} name='normal' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.poison} name='poison' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.psychic} name='psychic' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.rock} name='rock' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.steel} name='steel' size='small' isCheckbox onCheckChange={updateCheckBox} />
        <TypesIcon imgUrl={typeIcons.water} name='water' size='small' isCheckbox onCheckChange={updateCheckBox} />

      </div>
    </div>
  )
}

export default NavigationBar
