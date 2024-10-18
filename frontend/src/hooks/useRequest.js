import axios from 'axios';

import { useAppContext } from "../context/app_context"

const useRequest = () => {
  const { setLoading, setError } = useAppContext()

  const makeGetRequest = async (endpoint) => {
    setLoading(true)
    setError(null)

    try {
      const res = await axios.get(endpoint, { withCredentials: true })
      return res
    } catch (e) {
      setError(`${endpoint} ${e.message}`)
      return { status: e.response?.status, message: e.message }
    } finally {
      setLoading(false)
    }
  }

  const makePostRequest = async (endpoint, body) => {
    setLoading(true)
    setError(null)

    try {
      const res = await axios.post(endpoint, body, { withCredentials: true })
      return res
    } catch (e) {
      setError(`${endpoint} ${e.message}`)
      return { status: e.response?.status, message: e.message }
    } finally {
      setLoading(false)
    }
  }

  const makeDeleteRequest = async (endpoint) => {
    setLoading(true)
    setError(null)

    try {
      const res = await axios.delete(endpoint, { withCredentials: true })
      return res
    } catch (e) {
      setError(`${endpoint} ${e.message}`)
      return { status: e.response?.status, message: e.message }
    } finally {
      setLoading(false)
    }
  }

  const makePutRequest = async (endpoint, body) => {
    setLoading(true)
    setError(null)

    try {
      const res = await axios.put(endpoint, body, { withCredentials: true })
      return res
    } catch (e) {
      setError(`${endpoint} ${e.message}`)
      return { status: e.response?.status, message: e.message }
    } finally {
      setLoading(false)
    }
  }

  return { 
    makeGetRequest, 
    makePostRequest, 
    makeDeleteRequest, 
    makePutRequest,
   }
}

export default useRequest