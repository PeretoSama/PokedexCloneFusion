import styles from './TypesIcon.module.css'
import React from 'react'
import SvgCustom from '../components/SvgCustom.jsx'
function TypesIcon ({ name, isCheckbox, onCheckChange, isRegion }) {
  let correctIcon = ''
  if (isCheckbox) {
    correctIcon = (
      <div className={styles.iconWrapper}>
        <input className={styles.typeCheckBox} onChange={onCheckChange} type='checkbox' name={name} id={name} />
        <label htmlFor={name} className={`${styles.typeCheckboxIconWrapper} ${styles[name]} ${styles.checkbox}`}>
          <div className={styles.checkBoxiconImg}><SvgCustom type={name} /></div>
          <h4 className={styles.typeName}>{name[0].toUpperCase() + name.slice(1)}</h4>
        </label>
      </div>
    )
  } else {
    correctIcon = (
      <div className={styles.iconWrapper}>
        <div className={`${styles.typeIconWrapper} ${styles[name]}`}>
          <div className={styles.iconImg}><SvgCustom type={name} /></div>
          <h4 className={styles.typeName}>{name[0].toUpperCase() + name.slice(1)}</h4>
        </div>
      </div>
    )
  }
  if (isRegion) {
    correctIcon = (
      <div className={styles.iconWrapper}>
        <input className={styles.typeCheckBox} onChange={onCheckChange} type='checkbox' name={name} id={name} />
        <label htmlFor={name} className={`${styles.regionCheckboxWrapper} ${styles[name]} ${styles.checkbox}`}>
          <h4 className={styles.typeName}>{name[0].toUpperCase() + name.slice(1)}</h4>
        </label>
      </div>
    )
  }

  return (
    <>
      {correctIcon}
    </>
  )
}

export default TypesIcon
