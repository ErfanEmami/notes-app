import React from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/app_context';


const withRequest = (WrappedComponent) => {
  return (props) => {

    const { setLoading, setError } = useAppContext()

    const makeGetRequest = async (endpoint) => {
      setLoading(true)
      setError(null)

      try {
        const res = await axios.get(endpoint, { withCredentials: true })
        return res
      } catch (e) {
        setError(`${endpoint} ${e.message}`)
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
      } finally {
        setLoading(false)
      }
    }

    return (
      <WrappedComponent
        makePostRequest={makePostRequest}
        makeGetRequest={makeGetRequest}
      />
    ) 
  };
};

export default withRequest;
