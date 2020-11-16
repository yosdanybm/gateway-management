import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  useMediaQuery,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles((theme) => ({
  dialog_root: {
    minWidth: '500px',
  },
  wrapper: {
    margin: '8px',
    position: 'relative',
  },
  buttonProgress: {
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px',
  },
  message: {
    fontWeight: 'bold',
    margin: '20px 0 15px 0',
  },
  actions_dialog: {
    marginTop: '25px',
  },
}));

const ConfirmDialog = (props) => {
  const { openModal, handleCloseModal, onSubmit, message } = props;

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [valor, setValor] = useState('');

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="form-dialog-title"
      fullScreen={fullScreen}
    >
      <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
      <Divider />
      <DialogContent className={classes.dialog_root}>
        <Typography
          className={classes.message}
          variant="subtitle2"
          gutterBottom
        >
          {message}
        </Typography>
        <Formik
          initialValues={{
            delete: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values || !values.delete) {
              errors.delete = 'Required';
            } else if (values.delete !== 'Delete') {
              errors.delete = `You must type Delete to confirm`;
            }

            return errors;
          }}
          onSubmit={onSubmit}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Typography variant="subtitle2" gutterBottom>
                {`Type Delete to confirm`}
              </Typography>
              <Field
                component={TextField}
                name="delete"
                placeholder="Are you sure?"
                variant="outlined"
                size="small"
              />
              <br />
              <DialogActions className={classes.actions_dialog}>
                <Button
                  onClick={handleCloseModal}
                  color="primary"
                  size="small"
                  className="mr-2"
                >
                  Cancel
                </Button>
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Confirm
                  </Button>
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  message: PropTypes.string,
  attr: PropTypes.string,
};

export default ConfirmDialog;
