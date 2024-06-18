import styles from './App.module.css'
import React, { useEffect, useState, useRef } from 'react'
import PreviewCard from './components/PreviewCard.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import FusionSection from './components/FusionSection.jsx'
import Pokemons from './pokemonsReduced.js'
import FusionModal from './components/FusionModal.jsx'
function App () {
  const [pokemonCards, setPokemonCards] = useState([])
  const [fusionCards, setFusionCards] = useState({
    unknown1: (<PreviewCard isFusion pokeName='Unknown' fusionId='unknown1' onDropF={onDrop} />),
    unknown2: (<PreviewCard isFusion pokeName='Unknown' fusionId='unknown2' onDropF={onDrop} />)
  })
  const [offset, setOffset] = useState(0)
  const limit = 35
  const [dragInfo, setDragInfo] = useState({ fusionID: 'unknown1', pokeID: '-1' })
  const [modalOn, setModalOn] = useState(false)
  const [modalInfo, setModalInfo] = useState({})
  const [allowCloseModal, setAllowCloseModal] = useState(false)
  const typeCheckboxes = {
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
  const generations = {
    generation1: { region: 'kanto', fromIndex: 0, toIndex: 151 },
    generation2: { region: 'johto', fromIndex: 151, toIndex: 251 },
    generation3: { region: 'hoenn', fromIndex: 251, toIndex: 386 },
    generation4: { region: 'sinnoh', fromIndex: 386, toIndex: 493 },
    generation5: { region: 'unova', fromIndex: 495, toIndex: 649 },
    generation6: { region: 'kalos', fromIndex: 649, toIndex: 721 },
    generation7: { region: 'alola', fromIndex: 721, toIndex: 809 },
    generation8: { region: 'galar', fromIndex: 809, toIndex: 905 },
    generation9: { region: 'paldea', fromIndex: 905, toIndex: 1025 }

  }
  const regionsCheckboxes = {
    kanto: false,
    johto: false,
    hoenn: false,
    sinnoh: false,
    unova: false,
    kalos: false,
    alola: false,
    galar: false,
    paldea: false

  }
  const [query, setQuery] = useState('')
  const queryRef = useRef(query)
  const typeCheckboxesRef = useRef(typeCheckboxes)
  const [typeCheckBoxs, setTypeCheckBoxs] = useState(typeCheckboxes)
  const regionCheckboxesRef = useRef(regionsCheckboxes)
  const [regionCheckBoxs, setRegionCheckBoxs] = useState(regionsCheckboxes)

  // UPDATE TYPE CHECKBOXS
  function updateCheckBox (e) {
    typeCheckboxesRef.current[e.target.name] = e.target.checked
    setTypeCheckBoxs((prevCheckboxes) => {
      const newCheckboxes = { ...prevCheckboxes }
      newCheckboxes[e.target.name] = e.target.checked
      return newCheckboxes
    })
  }
  // UPDATE REGION CHECKBOXS
  function updateRegionCheckbox (e) {
    regionCheckboxesRef.current[e.target.name] = e.target.checked
    setRegionCheckBoxs((prevCheckboxes) => {
      const newCheckboxes = { ...prevCheckboxes }
      newCheckboxes[e.target.name] = e.target.checked
      return newCheckboxes
    })
  }
  // SEARCH FILTER
  function filterPokemonByType (checkboxs, pokemonList) {
    // SAVE KEYS OF CHECKED CHECKBOX
    const selectedTypes = Object.keys(checkboxs).filter(type => checkboxs[type])
    const result = pokemonList.filter(pokemon => {
      // SAVE TYPE NAMES OF INVIDIVUAL POKEMON
      const pokemonTypes = pokemon.types
      if (selectedTypes.length === 1) {
        return pokemonTypes.includes(selectedTypes[0])
      } else {
        return selectedTypes.every(type => pokemonTypes.includes(type))
      }
    })

    return result
  }
  function filterPokemonByRegion (checkboxs, pokemonList) {
    // array of the selected regions
    console.log('FILTER REGIO ', checkboxs)
    const selectedRegions = Object.keys(checkboxs).filter(region => checkboxs[region])
    const filteredPokemons = []
    for (const region in selectedRegions) {
      for (const generation in generations) {
        if (generations[generation].region === selectedRegions[region]) {
          const { fromIndex, toIndex } = generations[generation]
          filteredPokemons.push(...pokemonList.slice(fromIndex, toIndex))
        }
      }
    }

    return filteredPokemons.filter(pokemon => pokemon.name.includes(queryRef.current))
  }
  // UPDATE SEARCH QUERY
  function updateSearch (onChangeResponse) {
    setQuery(onChangeResponse.target.value)
    queryRef.current = onChangeResponse.target.value
  }
  function filterPokemonByQuery (query, pokemonList) {
    const filteredPokemons = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    )
    // filteredPokemons.sort((a, b) => {
    //   const aName = a.name.toLowerCase()
    //   const bName = b.name.toLowerCase()

    //   const aStartsWithQuery = aName.startsWith(query.toLowerCase())
    //   const bStartsWithQuery = bName.startsWith(query.toLowerCase())

    //   if (aStartsWithQuery && !bStartsWithQuery) {
    //     return -1 // a debe ir antes que b
    //   } else if (!aStartsWithQuery && bStartsWithQuery) {
    //     return 1 // b debe ir antes que a
    //   } else {
    //     return 0 // No cambiar el orden
    //   }
    // })
    return filteredPokemons
  }
  // SEARCH QUERY UPDATE
  useEffect(() => {
    console.log('QUERY: ', query, 'QUERY REF', queryRef, 'TYPES: ', typeCheckBoxs, 'REGIONS: ', regionCheckBoxs)
    if (!query) {
      let noQueryPokemons = Pokemons
      console.log('NO QUERY POKE:', noQueryPokemons)
      if (isAnyCheckboxOn(regionCheckboxesRef)) {
        noQueryPokemons = filterPokemonByRegion(regionCheckBoxs, noQueryPokemons)
        console.log('NO QUERY REGIONS: ', regionCheckBoxs, noQueryPokemons)
      }
      if (isAnyCheckboxOn(typeCheckboxesRef)) {
        noQueryPokemons = filterPokemonByType(typeCheckBoxs, noQueryPokemons)
        console.log('NO QUERY TYPES: ', noQueryPokemons)
      }

      if (isAnyCheckboxOn(typeCheckboxesRef) || isAnyCheckboxOn(regionCheckboxesRef)) {
        setPokemonCards(createPokemonCards(noQueryPokemons, 0, noQueryPokemons.length))
      }
      if (!isAnyCheckboxOn(typeCheckboxesRef) && !isAnyCheckboxOn(regionCheckboxesRef)) {
        setOffset(0)
        setPokemonCards(createPokemonCards(Pokemons, 0, 35))
      }
    } else {
      let searchPokemons = Pokemons
      console.log('Query All Search Pokemons:', searchPokemons)
      if (isAnyCheckboxOn(regionCheckboxesRef)) {
        console.log('query regions pkemons:', searchPokemons)
        searchPokemons = filterPokemonByRegion(regionCheckBoxs, searchPokemons)
        console.log('query regions pkemons afterfilter:', searchPokemons)
      }
      if (isAnyCheckboxOn(typeCheckboxesRef)) {
        console.log('Query checkboxes', typeCheckboxesRef.current)
        searchPokemons = filterPokemonByType(typeCheckBoxs, searchPokemons)
      }
      searchPokemons = filterPokemonByQuery(queryRef.current, searchPokemons)
      console.log('Query All Search PokemonsAFTER:', searchPokemons)
      setPokemonCards(createPokemonCards(searchPokemons, 0, searchPokemons.length))
    }
  }, [query, typeCheckBoxs, regionCheckBoxs])
  // CREATE POKEMON CARDS
  function createPokemonCards (pokemons, from, to) {
    const pokeCards = []
    for (let i = 0 + from; i < to; i++) {
      // hay un problema con koraidon asi hay que hardcodearle la imgsrc

      let imgSrc =
      pokemons[i].sprites.home
        ? pokemons[i].sprites.home
        : (pokemons[i].sprites.default
            ? pokemons[i].sprites.default
            : pokemons[i].sprites.officialArtwork)
      if (pokemons[i].name.toLowerCase().includes('koraidon')) { imgSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1007.png' }
      if (pokemons[i].name.toLowerCase().includes('miraidon')) { imgSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1008.png' }
      pokeCards.push(<PreviewCard
        key={pokemons[i].id}
        imgSrc={imgSrc}
        pokemonId={pokemons[i].id ? pokemons[i].id : i}
        pokeName={pokemons[i].name[0].toUpperCase() + pokemons[i].name.slice(1)}
        types={pokemons[i].types}
        onDragStartFunc={onDragStart}
                     />)
    }
    return pokeCards
  }
  // PETITION FOR THE FIRST LIMIT POKEMONS
  useEffect(() => {
    const getFirstsPokemons = async () => {
      setPokemonCards(createPokemonCards(Pokemons, offset, limit))
    }
    getFirstsPokemons()
  }, [])

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (queryRef.current === '' && !isAnyCheckboxOn(typeCheckboxesRef) && !isAnyCheckboxOn(regionCheckboxesRef)) {
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
      const newPokemonCards = createPokemonCards(Pokemons, offset, Math.min(offset + limit, 1301))
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

  // DRAG AND DROP
  // function findParentWithId (element, targetId) {
  //   if (element.id.includes(targetId)) {
  //     return element
  //   }
  //   return findParentWithId(element.parentElement)
  // }

  // function findParentWithClassName (element, className) {
  //   const divs = document.querySelectorAll('[class*="cardWrapper"]')
  //   divs.forEach(currentDiv => {
  //     // findParentWithId(currentDiv,element)
  //   })
  //   return divs
  // }

  function onDragStart (e) {
    e.stopPropagation()
    e.dataTransfer.setData('card', e.currentTarget.id)
  }

  // ON DROP
  function onDrop (e) {
    e.preventDefault()
    const pokeId = e.dataTransfer.getData('card')
    const dragInfo = { fusionID: e.currentTarget.id, pokeID: pokeId - 1 }
    setDragInfo(dragInfo)
  }
  useEffect(() => {
    if (dragInfo.pokeID >= 0 && Pokemons[0]) {
      const imgSrc =
      Pokemons[dragInfo.pokeID].sprites.home
        ? Pokemons[dragInfo.pokeID].sprites.home
        : (Pokemons[dragInfo.pokeID].sprites.default
            ? Pokemons[dragInfo.pokeID].sprites.default
            : Pokemons[dragInfo.pokeID].sprites.officialArtwork)

      const newFusionCard = (
        <PreviewCard
          isFusion
          pokeName={Pokemons[dragInfo.pokeID].name}
          fusionId={dragInfo.fusionID} onDropF={onDrop}
          imgSrc={imgSrc}
          pokemonId={dragInfo.pokeID + 1}
          types={Pokemons[dragInfo.pokeID].types}
        />
      )

      setFusionCards((prevState) => {
        const newState = { ...prevState }
        newState[dragInfo.fusionID] = newFusionCard
        return newState
      })
    }
  }, [dragInfo])

  const handleSubmit = () => {
    if (!modalOn) {
      setAllowCloseModal(() => { return false })
      const postData = {
        prompt: `${fusionCards.unknown1.props.pokeName}+${fusionCards.unknown2.props.pokeName}`,
        image1: fusionCards.unknown1.props.imgSrc,
        image2: fusionCards.unknown2.props.imgSrc
      }
      fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
        .then(response => response.json())
        .then(data => {
          setModalInfo(data)
          console.log(data)
          setAllowCloseModal(() => { return true })
        })
        .catch((error) => {
          console.error('Error:', error)
          setAllowCloseModal(() => { return true })
        })
      setModalOn((modal) => { return !modal })

      console.log(postData)
    }
  }

  function setModalOff () {
    setModalOn(() => { return false })
  }
  return (
    <div className={styles.App}>
      <div className={styles.appBody}>
        {modalOn ? (<FusionModal pokeModalInfo={modalInfo} setModalOff={setModalOff} allowCloseModal={allowCloseModal} fusionCards={fusionCards} />) : ''}
        <header className={styles.bodyHeader}>
          <NavigationBar
            updateSearch={updateSearch}
            value={query}
            updateTypeCheckbox={updateCheckBox}
            checkBoxs={typeCheckBoxs}
            generations={generations}
            updateRegionCheckBoxes={updateRegionCheckbox}
          />
        </header>
        <main>
          <FusionSection fusionCards={fusionCards} submitbutton={handleSubmit} />
          <div className={styles.pokemonGrid}>{pokemonCards}</div>
        </main>
      </div>
    </div>
  )
}

export default App
