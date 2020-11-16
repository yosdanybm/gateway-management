import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../context/Store';
import Header from '../../shared/components/Header';
import {
  makeStyles,
  Box,
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Chip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import WifiIcon from '@material-ui/icons/Wifi';
import * as moment from 'moment';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundImage: 'linear-gradient(to right top, #104978, #3582b2, #3693ce)',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  content_modal: {
    padding: '25px',
  },
  list_item_text: {
    flex: 'none !important',
    margin: '4px 10px 4px 0px',
  },
  container_devices_empty: {
    textAlign: 'center',
    marginTop: 15,
  },
  devices_empty: {
    height: 85,
  },
  offline: {
    backgroundColor: '#ffe187 !important',
  },
  online: {
    backgroundColor: '#87d72bb0 !important',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DetailsGatewayModal(props) {
  const {
    openDetailModal,
    handleCloseDetailModal,
    handleOpenCreateDeviceModal,
    handleDeleteDevice,
  } = props;
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);

  return (
    <>
      {state.gateway && (
        <Dialog
          fullScreen
          open={openDetailModal}
          onClose={handleCloseDetailModal}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Details
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseDetailModal}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.content_modal}>
            <List>
              <ListItem>
                <ListItemText
                  className={classes.list_item_text}
                  secondary="Name:"
                />
                <ListItemText
                  className={classes.list_item_text}
                  primary={state.gateway.name}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  className={classes.list_item_text}
                  secondary="Serial Number:"
                />
                <ListItemText
                  className={classes.list_item_text}
                  primary={state.gateway.serial}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  className={classes.list_item_text}
                  secondary="IPV4:"
                />
                <ListItemText
                  className={classes.list_item_text}
                  primary={state.gateway.address}
                />
              </ListItem>
              <Divider />
            </List>

            <Box margin={1}>
              <Header
                device={true}
                deviceNotAllow={state.gateway.devices.length === 10}
                handleOpenModal={() =>
                  handleOpenCreateDeviceModal(state.gateway._id)
                }
              />

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>UID</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Created</TableCell>
                    <TableCell align="right">Updated</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {state.gateway.devices.length !== 0 && (
                    <>
                      {state.gateway.devices.map((deviceRow) => (
                        <TableRow key={deviceRow._id}>
                          <TableCell component="th" scope="row">
                            {deviceRow.uid}
                          </TableCell>
                          <TableCell>{deviceRow.vendor}</TableCell>
                          <TableCell>
                            <Chip
                              className={
                                deviceRow.status === 0
                                  ? classes.offline
                                  : classes.online
                              }
                              size="small"
                              label={
                                deviceRow.status === 0 ? 'Offline' : 'Online'
                              }
                              icon={
                                deviceRow.status === 0 ? (
                                  <WifiOffIcon />
                                ) : (
                                  <WifiIcon />
                                )
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            {moment(deviceRow.createdAt).format(
                              'DD/MM/YYYY hh:mm:ss'
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {moment(deviceRow.updatedAt).format(
                              'DD/MM/YYYY hh:mm:ss'
                            )}
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip
                              title="Delete Device"
                              placement="top"
                              arrow
                            >
                              <span>
                                <IconButton
                                  aria-label="delete"
                                  className={classes.margin_delete}
                                  onClick={() => {
                                    handleDeleteDevice(deviceRow._id);
                                  }}
                                >
                                  <DeleteIcon
                                    fontSize="small"
                                    color="secondary"
                                  />
                                </IconButton>
                              </span>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
              {state.gateway.devices.length === 0 && (
                <div className={classes.container_devices_empty}>
                  <img
                    src="/empty.gif"
                    alt="Devices empty"
                    className={classes.devices_empty}
                  />
                  <Typography variant="subtitle1" display="block" gutterBottom>
                    This gateway does not contain devices
                  </Typography>
                </div>
              )}
            </Box>
          </div>
        </Dialog>
      )}
    </>
  );
}

DetailsGatewayModal.propTypes = {
  openDetailModal: PropTypes.bool.isRequired,
  handleCloseDetailModal: PropTypes.func.isRequired,
  handleOpenCreateDeviceModal: PropTypes.func.isRequired,
  handleDeleteDevice: PropTypes.func.isRequired,
};

export default DetailsGatewayModal;
