import React from 'react'
import Normal from '../assets/typesIcons/normal.svg?react'
import Fire from '../assets/typesIcons/fire.svg?react'
import Water from '../assets/typesIcons/water.svg?react'
import Electric from '../assets/typesIcons/electric.svg?react'
import Grass from '../assets/typesIcons/grass.svg?react'
import Ice from '../assets/typesIcons/ice.svg?react'
import Fighting from '../assets/typesIcons/fighting.svg?react'
import Poison from '../assets/typesIcons/poison.svg?react'
import Ground from '../assets/typesIcons/ground.svg?react'
import Flying from '../assets/typesIcons/flying.svg?react'
import Psychic from '../assets/typesIcons/psychic.svg?react'
import Bug from '../assets/typesIcons/bug.svg?react'
import Rock from '../assets/typesIcons/rock.svg?react'
import Ghost from '../assets/typesIcons/ghost.svg?react'
import Dragon from '../assets/typesIcons/dragon.svg?react'
import Dark from '../assets/typesIcons/dark.svg?react'
import Steel from '../assets/typesIcons/steel.svg?react'
import Fairy from '../assets/typesIcons/fairy.svg?react'
import styles from './SvgCustom.module.css'
import PokeBall from '../assets/images/pokeball.svg?react'
import FuseIcon from '../assets/images/fuseIcon.svg?react'
function SvgCustom ({ type, cWidth, cHeight }) {
  let svg = ''
  switch (type) {
    case 'bug':
      svg = <Bug className={styles.bug} width={25} height={25} />
      break
    case 'dark':
      svg = <Dark className={styles.dark} width={25} height={25} />
      break
    case 'dragon':
      svg = <Dragon className={styles.dragon} width={25} height={25} />
      break
    case 'electric':
      svg = <Electric className={styles.electric} width={25} height={25} />
      break
    case 'fairy':
      svg = <Fairy className={styles.fairy} width={25} height={25} />
      break
    case 'fighting':
      svg = <Fighting className={styles.fighting} width={25} height={25} />
      break
    case 'fire':
      svg = <Fire className={styles.fire} width={25} height={25} />
      break
    case 'flying':
      svg = <Flying className={styles.flying} width={25} height={25} />
      break
    case 'ghost':
      svg = <Ghost className={styles.ghost} width={25} height={25} />
      break
    case 'grass':
      svg = <Grass className={styles.grass} width={25} height={25} />
      break
    case 'ground':
      svg = <Ground className={styles.ground} width={25} height={25} />
      break
    case 'ice':
      svg = <Ice className={styles.ice} width={25} height={25} />
      break
    case 'normal':
      svg = <Normal className={styles.normal} width={25} height={25} />
      break
    case 'poison':
      svg = <Poison className={styles.poison} width={25} height={25} />
      break
    case 'psychic':
      svg = <Psychic className={styles.psychic} width={25} height={25} />
      break
    case 'rock':
      svg = <Rock className={styles.rock} width={25} height={25} />
      break
    case 'steel':
      svg = <Steel className={styles.steel} width={25} height={25} />
      break
    case 'water':
      svg = <Water className={styles.water} width={25} height={25} />
      break
    case 'pokeball':
      svg = <PokeBall width={cWidth} height={cHeight} />
      break
    case 'fuseIcon':
      svg = <FuseIcon width={cWidth} height={cHeight} />
      break
    default:
      svg = null
  }
  return (
    <>
      {svg}
    </>

  )
}

export default SvgCustom
