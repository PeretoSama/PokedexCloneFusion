import styles from './App.module.css'
import React, { useEffect, useState, useRef } from 'react'
import PreviewCard from './components/PreviewCard.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import FusionSection from './components/FusionSection.jsx'
import Pokemons from './pokemonsReduced.js'
import FusionModal from './components/FusionModal.jsx'
function App () {
  console.log('App component executed')
  const limit = 35
  const [pokemonCards, setPokemonCards] = useState([])
  const [fusionCards, setFusionCards] = useState({
    unknown1: (<PreviewCard isFusion pokeName='Unknown' fusionId='unknown1' onDropF={onDrop} />),
    unknown2: (<PreviewCard isFusion pokeName='Unknown' fusionId='unknown2' onDropF={onDrop} />)
  })
  const [dragInfo, setDragInfo] = useState({ fusionID: 'unknown1', pokeID: '-1' })
  const [offset, setOffset] = useState(0)
  const [query, setQuery] = useState('')
  const [modalOn, setModalOn] = useState(false)
  const [modalInfo, setModalInfo] = useState({ img1: '', img2: '', img3: '', img4: '' })
  const [allowCloseModal, setAllowCloseModal] = useState(false)
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
      const filteredPokes = filterPokemonByType(checkboxesRef.current, Pokemons, queryRef)
      const filteredCards = createPokemonCards(filteredPokes, 0, filteredPokes.length)
      setPokemonCards(filteredCards)
    } else {
      console.log('offfff')
      setPokemonCards(createPokemonCards(Pokemons, 0, limit))
    }

    setCheckBoxs((prevCheckboxes) => {
      const newCheckboxes = prevCheckboxes
      newCheckboxes[e.target.name] = e.target.checked
      return newCheckboxes
    })
  }
  // CREATE POKEMON CARDS
  function createPokemonCards (pokemons, from, to) {
    console.log('From: ', from, 'To :', to)
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
      console.log('OFFSET: ', offset + limit, Math.min(offset + limit, 1301))
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
  // SEARCH FILTER
  function filterPokemonByType (checkboxs, pokemonList, query) {
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
    if (query.current === '') {
      return result
    } else {
      return result.filter(pokemon => pokemon.name.includes(queryRef.current))
    }
  }
  // SEARCH QUERY UPDATE
  useEffect(() => {
    console.log(Pokemons)
    queryRef.current = query
    if (query === '') {
      setOffset(0)
      setPokemonCards(createPokemonCards(Pokemons, 0, 35))
    } else {
      const searchPokemonCards = filterPokemonByType(checkboxesRef.current, Pokemons, queryRef)
      setPokemonCards(createPokemonCards(searchPokemonCards, 0, searchPokemonCards.length))
    }
  }, [query])
  useEffect(() => {
    console.log(checkBoxs)
  }, [checkBoxs])

  // DRAG AND DROP
  // function findParentWithId (element, targetId) {
  //   console.log('ELEMENT', element)
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
    console.log('ON DRAG START: ', e)
  }

  // ON DROP
  function onDrop (e) {
    e.preventDefault()
    const pokeId = e.dataTransfer.getData('card')
    const dragInfo = { fusionID: e.currentTarget.id, pokeID: pokeId - 1 }
    setDragInfo(dragInfo)
    console.log('ON DROP', e.currentTarget)
  }
  useEffect(() => {
    console.log('DRAAAAAG INFOOOOOO', dragInfo)
    if (dragInfo.pokeID >= 0 && Pokemons[0]) {
      console.log('DRAG ALL POKE')
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
      console.log('Drag Info:', dragInfo, newFusionCard)
    }
  }, [dragInfo])
  // FILL CARD
  function fillCard (index) {
    console.log(Pokemons) // En el log sale undefined, cuando en verdad tiene 1302 pokemons dentro
  }
  const handleSubmit = () => {
    if (!modalOn) {
      setAllowCloseModal(() => { return false })
      console.log(fusionCards.unknown1.props)
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
          console.log('Success:', data)
          setModalInfo({

            img1: data.images[0].url,
            img2: data.images[1].url,
            img3: data.images[2].url,
            img4: data.images[3].url

          })
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
  console.log('TEST', Pokemons.length)
  return (
    <div className={styles.App}>
      <div className={styles.appBody}>
        {modalOn ? (<FusionModal pokeModalInfo={modalInfo} setModalOff={setModalOff} allowCloseModal={allowCloseModal} />) : ''}
        <header className={styles.bodyHeader}>
          <NavigationBar
            updateSearch={updateSearch}
            value={query}
            updateCheckBox={updateCheckBox}
            checkBoxs={checkBoxs}
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
