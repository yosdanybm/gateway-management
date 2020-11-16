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
  FormLabel,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, Field } from 'formik';
import { TextField, Switch } from 'formik-material-ui';
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
  container_switch: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '2px',
    marginTop: '25px',
  },
}));

const CreateSchema = Yup.object().shape({
  uid: Yup.string().matches(/^\d+$/, 'Format invalid').required('Required'),
  vendor: Yup.string().trim().required('Required'),
});

const CreateDeviceDialog = (props) => {
  const {
    openCreateDeviceModal,
    handleCloseCreateDeviceModal,
    onSubmit,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Dialog
        open={openCreateDeviceModal}
        onClose={handleCloseCreateDeviceModal}
        aria-labelledby="form-dialog-title"
        fullScreen={fullScreen}
      >
        <DialogTitle id="form-dialog-title">Create Device</DialogTitle>
        <Divider />
        <DialogContent className={classes.dialog}>
          <Formik
            initialValues={{
              uid: '',
              vendor: '',
              status: false,
            }}
            validationSchema={CreateSchema}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting, values }) => (
              <Form>
                <Field
                  component={TextField}
                  name="uid"
                  id="uid"
                  type="number"
                  min="1"
                  label="UID"
                  placeholder="UID"
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
                  name="vendor"
                  id="vendor"
                  label="Vendor"
                  placeholder="Vendor"
                  fullWidth
                  disabled={isSubmitting}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br />
                <div className={classes.container_switch}>
                  <FormLabel component="legend">Status:</FormLabel>
                  <Tooltip title={values.status ? 'Online' : 'Offline'} arrow>
                    <span>
                      <Field
                        component={Switch}
                        name="status"
                        id="status"
                        type="checkbox"
                        disabled={isSubmitting}
                        label="Status:"
                        margin="normal"
                        color="primary"
                      />
                    </span>
                  </Tooltip>
                </div>

                <br />
                <DialogActions className={classes.actions}>
                  <Button
                    onClick={handleCloseCreateDeviceModal}
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

export default CreateDeviceDialog;
