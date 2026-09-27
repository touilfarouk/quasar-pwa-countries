import { ref } from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://countries.dev'
})

const countryCodes = ['BR', 'CO', 'NO', 'EE', 'PE', 'AR']

export function useCountries() {
  const countries = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchCountries() {
    loading.value = true
    error.value = null
    try {
      const responses = await Promise.all(countryCodes.map(code =>
        api.get(`/alpha/${code}`)
      ))

      countries.value = responses
        .map(({ data }) => ({
          name: data.name,
          flag: data.flags.png,
          population: data.population,
          region: data.region
        }))
    } catch (err) {
      if (err.response) {
        error.value = `Could not load countries (API error ${err.response.status}).`
      } else {
        error.value = err.message || 'Could not connect to the countries API.'
      }
    } finally {
      loading.value = false
    }
  }

  return { countries, loading, error, fetchCountries }
}
