import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

const SnackbarAlert = (props) => {
  const {
    openAlert,
    openAlertError,
    handleCloseAlert,
    messageSuccess,
    messageError,
  } = props;
  return (
    <>
      <Snackbar
        open={openAlert}
        onClose={handleCloseAlert}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={handleCloseAlert}>
          {messageSuccess || 'Changes successfully saved!'}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertError}
        onClose={handleCloseAlert}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          <strong>An error has occurred!</strong> <br />
          {messageError || 'Please try again or contact the administrator.'}
        </Alert>
      </Snackbar>
    </>
  );
};

SnackbarAlert.propTypes = {
  openAlert: PropTypes.bool,
  openAlertError: PropTypes.bool,
  handleCloseAlert: PropTypes.func.isRequired,
  messageSuccess: PropTypes.string,
  messageError: PropTypes.string,
};

export default SnackbarAlert;
