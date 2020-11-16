import React from 'react';

import {
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { green } from '@material-ui/core/colors';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  actions: {
    paddingTop: '25px',
    marginTop: '10px',
  },
  dialog: {
    minWidth: '500px',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const CreateSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  serial: Yup.string().trim().required('Required'),
  address: Yup.string()
    .trim()
    .matches(
      /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/,
      'IPV4 address is invalid'
    )
    .required('Required'),
});

const CreateGatewayDialog = (props) => {
  const {
    openCreateGatewayModal,
    handleCloseCreateGatewayModal,
    onSubmit,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Dialog
        open={openCreateGatewayModal}
        onClose={handleCloseCreateGatewayModal}
        aria-labelledby="form-dialog-title"
        fullScreen={fullScreen}
      >
        <DialogTitle id="form-dialog-title">Create Gateway</DialogTitle>
        <Divider />
        <DialogContent className={classes.dialog}>
          <Formik
            initialValues={{
              name: '',
              serial: '',
              address: '',
            }}
            validationSchema={CreateSchema}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Field
                  component={TextField}
                  name="name"
                  id="name"
                  label="Name"
                  placeholder="Name"
                  fullWidth
                  disabled={isSubmitting}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br />
                <Field
                  component={TextField}
                  name="serial"
                  id="serial"
                  label="Serial Number"
                  placeholder="Serial Number"
                  fullWidth
                  disabled={isSubmitting}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br />
                <Field
                  component={TextField}
                  name="address"
                  id="address"
                  label="Address"
                  placeholder="Address"
                  fullWidth
                  disabled={isSubmitting}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br />
                <DialogActions className={classes.actions}>
                  <Button
                    onClick={handleCloseCreateGatewayModal}
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
                      startIcon={<AddIcon />}
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Create
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
    </>
  );
};

export default CreateGatewayDialog;
