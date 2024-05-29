async function GetPokemons (limit, offset) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    if (!response.ok) {
      throw new Error('Response not OK')
    }
    const data = await response.json()
    const allPokemons = await Promise.all(data.results.map(async (result) => {
      const detailResponse = await fetch(result.url)
      if (!detailResponse.ok) {
        throw new Error('Detailed response not OK')
      }
      const pokemonDetails = await detailResponse.json()
      return pokemonDetails
    }))
    return allPokemons
  } catch (error) {
    console.error('Error fetching', error)
    throw error
  }
}
export default GetPokemons
