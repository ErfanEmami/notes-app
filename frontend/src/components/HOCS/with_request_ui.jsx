import React from 'react';

import { useAppContext } from '../../context/app_context';
import SpinnerOverlay from '../SpinnerOverlay/spinner_overlay';
import Modal from '../Modal/modal';

const withRequestUI = (Component) => {
  return () => {

    const { loading, error, setError } = useAppContext()

    const renderLoading = () => {
      if (!loading) return null
  
      return (
        <SpinnerOverlay />
      )
    }
  
    const renderErrorModal = () => {
      if (!error) return null
      
      return (
        <Modal onClose={() => setError(null)}>
          <div>{error}</div>
        </Modal>
      )
    }

    return (
      <React.Fragment>
        {renderLoading()}
        {renderErrorModal()}
        <Component />
      </React.Fragment>
    )
  };
};

export default withRequestUI;
