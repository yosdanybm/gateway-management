import React, { useEffect, useState, useContext, useCallback } from 'react';
import { makeStyles, Backdrop, CircularProgress } from '@material-ui/core';
import {
  listAllGateways,
  deleteGateWay,
  createGateWay,
} from '../../api/gateway';
import SnackbarAlert from '../../shared/components/SnackbarAlert';
import CollapsibleTable from './CollapsibleTable';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import DialogCreateGateway from './CreateGatewayDialog';
import DetailsGatewayModal from './DetailsGatewayModal';
import { Context } from '../../context/Store';
import CreateDeviceDialog from './CreateDeviceDialog';
import { createDevice, deleteDevice } from '../../api/device';
import Header from '../../shared/components/Header';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  container: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  title: {
    flex: '1 1 100%',
  },
}));

const Gateways = () => {
  const [state, dispatch] = useContext(Context);
  const classes = useStyles();
  const [loadingData, setLoadingData] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [data, setData] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    items: [],
    total: 0,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateGatewayModal, setOpenCreateGatewayModal] = useState(false);
  const [openCreateDeviceModal, setOpenCreateDeviceModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const listDataInitial = useCallback(() => {
    setLoadingData(true);
    listAllGateways(rowsPerPage, page)
      .then((response) => {
        setData((prevState) => ({ ...prevState, ...response.data }));
        setLoadingData(false);
      })
      .catch((error) => {
        setLoadingData(false);
        setOpenAlertError(true);
      });
  }, [rowsPerPage, page]);

  useEffect(() => {
    listDataInitial();
  }, [listDataInitial]);

  const onCreateGateway = (values, { setSubmitting }) => {
    const submit = async () => {
      createGateWay(values)
        .then((data) => {
          if (!data.data.error) {
            listDataInitial();
            setSubmitting(false);
            setMessageSuccess('Has been successfully created');
            setOpenAlert(true);
            setOpenCreateGatewayModal(false);
          } else {
            setMessageError(data.data.error);
            setSubmitting(false);
            setOpenAlertError(true);
          }
        })
        .catch((error) => {
          setSubmitting(false);
          setOpenAlertError(true);
        });
    };
    submit();
  };

  const onDeleteGateway = (values, { setSubmitting }) => {
    const submit = async () => {
      deleteGateWay(state.currentIDGateway)
        .then((data) => {
          if (data.data) {
            listDataInitial();
            setSubmitting(false);
            setMessageSuccess('Has been successfully removed');
            setOpenAlert(true);
            setOpenDeleteModal(false);
          } else {
            setSubmitting(false);
            setOpenAlertError(true);
          }
        })
        .catch((error) => {
          setSubmitting(false);
          setOpenAlertError(true);
        });
    };
    submit();
  };

  const onDeleteDevice = (values, { setSubmitting }) => {
    const submit = async () => {
      deleteDevice(state.currentIDDevice)
        .then((data) => {
          if (data.data) {
            if (state.gateway) {
              let gatewayTmp = state.gateway;
              gatewayTmp.devices = gatewayTmp.devices.filter(
                (x) => x._id !== data.data._id
              );
              dispatch({
                type: 'SET_GATEWAY',
                payload: gatewayTmp,
              });
            }
            listDataInitial();
            setSubmitting(false);
            setMessageSuccess('Has been successfully removed');
            setOpenAlert(true);
            setOpenDeleteModal(false);
          } else {
            setSubmitting(false);
            setOpenAlertError(true);
          }
        })
        .catch((error) => {
          setSubmitting(false);
          setOpenAlertError(true);
        });
    };
    submit();
  };

  const onCreateDevice = (values, { setSubmitting }) => {
    const submit = async () => {
      createDevice({
        idGateway: state.currentIDGateway,
        uid: values.uid,
        vendor: values.vendor,
        status: values.status ? 1 : 0,
      })
        .then((data) => {
          if (!data.data.error) {
            if (state.gateway) {
              let gatewayTmp = state.gateway;
              gatewayTmp.devices.push(data.data);
              dispatch({
                type: 'SET_GATEWAY',
                payload: gatewayTmp,
              });
            }
            listDataInitial();
            setSubmitting(false);
            setMessageSuccess('Has been successfully created');
            setOpenAlert(true);
            setOpenCreateDeviceModal(false);
          } else {
            setMessageError(data.data.error);
            setSubmitting(false);
            setOpenAlertError(true);
          }
        })
        .catch((error) => {
          setSubmitting(false);
          setOpenAlertError(true);
        });
    };
    submit();
  };

  const handleDeleteGateway = (id) => {
    dispatch({
      type: 'SET_ID_CURRENT_GATEWAY',
      payload: id,
    });
    setOpenDeleteModal(true);
  };

  const handleDeleteDevice = (id) => {
    dispatch({
      type: 'SET_ID_CURRENT_DEVICE',
      payload: id,
    });
    setOpenDeleteModal(true);
  };

  const handleDetailGateway = (gateway) => {
    dispatch({
      type: 'SET_GATEWAY',
      payload: gateway,
    });
    setOpenDetailModal(true);
  };

  const handleOpenCreateDeviceModal = (id) => {
    dispatch({
      type: 'SET_ID_CURRENT_GATEWAY',
      payload: id,
    });
    setOpenCreateDeviceModal(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setOpenAlertError(false);
    setMessageSuccess(null);
    setMessageError(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleResetPagination = () => {
    setRowsPerPage(5);
    setPage(0);
  };

  return (
    <>
      <div className={classes.container}>
        <Header
          device={false}
          handleOpenModal={() => setOpenCreateGatewayModal(true)}
        />

        {loadingData ? (
          <Backdrop open={true} invisible={true}>
            <CircularProgress id="loading-progress" size={30} />
          </Backdrop>
        ) : (
          <CollapsibleTable
            data={data}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleDeleteGateway={handleDeleteGateway}
            handleDetailGateway={handleDetailGateway}
            handleOpenCreateDeviceModal={handleOpenCreateDeviceModal}
            handleDeleteDevice={handleDeleteDevice}
          />
        )}
      </div>

      <ConfirmDialog
        openModal={openDeleteModal}
        handleCloseModal={() => setOpenDeleteModal(false)}
        onSubmit={state.currentIDGateway ? onDeleteGateway : onDeleteDevice}
        message={`Are you sure you want to delete this ${
          state.currentIDGateway ? 'gateway' : 'device'
        }?`}
      />

      <DialogCreateGateway
        openCreateGatewayModal={openCreateGatewayModal}
        handleCloseCreateGatewayModal={() => setOpenCreateGatewayModal(false)}
        onSubmit={onCreateGateway}
      />

      <CreateDeviceDialog
        openCreateDeviceModal={openCreateDeviceModal}
        handleCloseCreateDeviceModal={() => setOpenCreateDeviceModal(false)}
        onSubmit={onCreateDevice}
      />

      <DetailsGatewayModal
        openDetailModal={openDetailModal}
        handleCloseDetailModal={() => {
          setOpenDetailModal(false);
          dispatch({
            type: 'SET_GATEWAY',
            payload: null,
          });
        }}
        handleOpenCreateDeviceModal={handleOpenCreateDeviceModal}
        handleDeleteDevice={handleDeleteDevice}
      />

      <SnackbarAlert
        openAlert={openAlert}
        openAlertError={openAlertError}
        handleCloseAlert={handleCloseAlert}
        messageSuccess={messageSuccess}
        messageError={messageError}
      />
    </>
  );
};
export default Gateways;
