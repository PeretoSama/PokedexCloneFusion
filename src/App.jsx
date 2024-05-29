import styles from './App.module.css'
import { useEffect, useState, useRef } from 'react'
import PreviewCard from './components/PreviewCard.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import GetPokemons from './services/GetPokemons.js'
import FusionSection from './components/FusionSection.jsx'

function App () {
  console.log('App component executed')
  const limit = 35
  const [firstPokemons, setFirstPokemons] = useState([])
  const [allPokemons, setAllPokemons] = useState([])
  const [pokemonCards, setPokemonCards] = useState([])
  const [offset, setOffset] = useState(0)
  const [query, setQuery] = useState('')
  const queryRef = useRef(query)
  const checkboxes = {
    electric: false,
    normal: false,
    fire: false,
    water: false,
    grass: false,
    ice: false,
    fighting: false,
    poison: false,
    ground: false,
    flying: false,
    psychic: false,
    bug: false,
    rock: false,
    ghost: false,
    dragon: false,
    dark: false,
    steel: false,
    fairy: false

  }
  const checkboxesRef = useRef(checkboxes)
  const [checkBoxs, setCheckBoxs] = useState(checkboxes)

  // UPDATE SEARCH QUERY
  function updateSearch (onChangeResponse) {
    setQuery(onChangeResponse.target.value)
  }
  // UPDATE TYPE CHECKBOXS
  function updateCheckBox (e) {
    checkboxesRef.current[e.target.name] = e.target.checked
    if (isAnyCheckboxOn(checkboxesRef)) {
      const filteredPokes = filterPokemonByType(checkboxesRef.current, allPokemons, queryRef)
      const filteredCards = createPokemonCards(filteredPokes, 0, filteredPokes.length)
      setPokemonCards(filteredCards)
    } else {
      console.log('offfff')
      setPokemonCards(createPokemonCards(firstPokemons, 0, limit))
    }

    setCheckBoxs((prevCheckboxes) => {
      const newCheckboxes = prevCheckboxes
      newCheckboxes[e.target.name] = e.target.checked
      return newCheckboxes
    })
  }
  // CREATE POKEMON CARDS
  function createPokemonCards (pokemons, from, to) {
    const pokeCards = []
    for (let i = 0 + from; i < to; i++) {
      // hay un problema con koraidon asi hay que hardcodearle la imgsrc

      let imgSrc =
      pokemons[i].sprites.other.home.front_default
        ? pokemons[i].sprites.other.home.front_default
        : (pokemons[i].sprites.front_default
            ? pokemons[i].sprites.front_default
            : pokemons[i].sprites.other['official-artwork'].front_default)
      if (pokemons[i].name.toLowerCase().includes('koraidon')) { imgSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1007.png' }
      pokeCards.push(<PreviewCard
        key={pokemons[i].id}
        imgSrc={imgSrc}
        pokemonId={pokemons[i].id ? pokemons[i].id : i}
        pokeName={pokemons[i].name[0].toUpperCase() + pokemons[i].name.slice(1)}
        types={pokemons[i].types.map(type => type.type.name)}
        onDragStartFunc={onDragStart}
                     />)
    }
    return pokeCards
  }
  // PETITION FOR THE FIRST LIMIT POKEMONS
  useEffect(() => {
    const getFirstsPokemons = async () => {
      const data = await GetPokemons(limit, 0)
      setFirstPokemons(data)
      setPokemonCards(createPokemonCards(data, offset, limit))
    }
    getFirstsPokemons()
  }, [])
  // PETITION FOR ALL POKEMONS
  useEffect(() => {
    const getAllPokemons = async () => {
      const data = await GetPokemons(1302, 0)
      setAllPokemons(data)
    }
    getAllPokemons()
  }, [])
  // FAKE INFINITE SCROLL
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (queryRef.current === '' && !isAnyCheckboxOn(checkboxesRef)) {
        setOffset(prevOffset => prevOffset + limit)
      }
    }
  }
  // HANDLE SCROLL
  useEffect(() => {
    if (pokemonCards.length > 0) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [pokemonCards, offset])
  // CHANGE POKEMON CARDS WHEN OFFSET UPDATES
  useEffect(() => {
    if (offset > 0) {
      const newPokemonCards = createPokemonCards(allPokemons, offset, Math.min(offset + limit, 1302))
      setPokemonCards(prevCards => [...prevCards, ...newPokemonCards])
    }
  }, [offset])

  function isAnyCheckboxOn (obj) {
    obj = obj.current
    for (const key in obj) {
      if (obj[key] === true) {
        return true
      }
    }
    return false
  }
  // SEARCH FILTER
  function filterPokemonByType (checkboxs, pokemonList, query) {
    // SAVE KEYS OF CHECKED CHECKBOX
    const selectedTypes = Object.keys(checkboxs).filter(type => checkboxs[type])
    const result = pokemonList.filter(pokemon => {
      // SAVE TYPE NAMES OF INVIDIVUAL POKEMON
      const pokemonTypes = pokemon.types.map(type => type.type.name)
      if (selectedTypes.length === 1) {
        return pokemonTypes.includes(selectedTypes[0])
      } else {
        return selectedTypes.every(type => pokemonTypes.includes(type))
      }
    })
    if (query.current === '') {
      return result
    } else {
      return result.filter(pokemon => pokemon.name.includes(queryRef.current))
    }
  }
  // SEARCH QUERY UPDATE
  useEffect(() => {
    queryRef.current = query
    if (query === '') {
      setOffset(0)
      setPokemonCards(createPokemonCards(firstPokemons, 0, firstPokemons.length))
    } else {
      const searchPokemonCards = filterPokemonByType(checkboxesRef.current, allPokemons, queryRef)
      setPokemonCards(createPokemonCards(searchPokemonCards, 0, searchPokemonCards.length))
    }
  }, [query])
  useEffect(() => {
    console.log(checkBoxs)
  }, [checkBoxs])

  // CADA VEZ ESTO ES MAS LARGO Y ME DA MAS ASCO PERO VOY A ACABARLO PORQUE REFACTORIZARLO ME
  // VA A DAR UN DOLOR DE HUEVOS TREMENDO

  // DRAG AND DROP
  function findParentWithId (element, targetId) {
    console.log('ELEMENT', element)
    if (element.id.includes(targetId)) {
      return element
    }
    return findParentWithId(element.parentElement)
  }

  function findParentWithClassName (element, className) {
    const divs = document.querySelectorAll('[class*="cardWrapper"]')
    divs.forEach(currentDiv => {
      // findParentWithId(currentDiv,element)
    })
    return divs
  }

  function onDragStart (e) {
    e.stopPropagation()
    console.log('ON DRAG START: ', e, e.currentTarget)
    const previewImg = e.currentTarget

    e.dataTransfer.setDragImage(previewImg, 0, 0)
  }
  return (
    <div className={styles.App}>
      <div className={styles.appBody}>
        <header className={styles.bodyHeader}>
          <NavigationBar updateSearch={updateSearch} value={query} updateCheckBox={updateCheckBox} checkBoxs={checkBoxs} />
        </header>
        <main>
          <FusionSection onDragFunction={onDragStart} />
          <div className={styles.pokemonGrid}>{pokemonCards}</div>
        </main>
      </div>
    </div>
  )
}

export default App
