import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
  Paper,
  Badge,
  Tooltip,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  Button,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import * as moment from 'moment';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import WifiIcon from '@material-ui/icons/Wifi';
import clsx from 'clsx';
import TablePaginationActions from '../../shared/components/TablePaginationActions';
import Header from '../../shared/components/Header';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useRowStyles = makeStyles({
  row: {
    '& > *': {
      borderBottom: 'unset',
    },
    '&:hover': {
      backgroundColor: '#9e9e9e2e !important',
      cursor: 'pointer',
    },
  },
  offline: {
    backgroundColor: '#ffe187 !important',
  },
  online: {
    backgroundColor: '#87d72bb0 !important',
  },
  openRow: {
    backgroundColor: '#9e9e9e2e !important',
  },
  icon_menu: {
    minWidth: '35px !important',
  },
  header_devices: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  margin_delete: {
    margin: '5px',
  },
  container_devices_empty: {
    textAlign: 'center',
    marginTop: 15,
  },
  container_devices_empty_default: {
    textAlign: 'center',
    margin: '55px 15px 55px 15px',
  },
  devices_empty: {
    height: 85,
  },
});

function Row(props) {
  const {
    row,
    index,
    handleDeleteGateway,
    handleDetailGateway,
    handleOpenCreateDeviceModal,
    handleDeleteDevice,
  } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEl, setOpenEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenEl(event.currentTarget.getAttribute('aria-controls'));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenEl(null);
  };

  return (
    <React.Fragment>
      <TableRow
        className={clsx(classes.row, {
          [classes.openRow]: open,
        })}
        onClick={() => setOpen(!open)}
      >
        <TableCell>
          <Tooltip
            title={
              row.devices.length === 0 ? 'It does not contain devices' : ''
            }
            arrow
          >
            <span>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </span>
          </Tooltip>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.serial}</TableCell>
        <TableCell align="right">
          {moment(row.createdAt).format('DD/MM/YYYY hh:mm:ss')}
        </TableCell>
        <TableCell align="right">
          {moment(row.updatedAt).format('DD/MM/YYYY hh:mm:ss')}
        </TableCell>
        <TableCell align="right" style={{ paddingRight: 25 }}>
          <Tooltip
            title={
              row.devices.length === 0
                ? 'It does not contain devices'
                : `Contain ${row.devices.length} devices`
            }
            arrow
          >
            <span>
              <Badge
                showZero
                badgeContent={row.devices.length}
                color={row.devices.length === 0 ? 'secondary' : 'primary'}
              ></Badge>
            </span>
          </Tooltip>
        </TableCell>
        <TableCell
          align="right"
          onClick={(event) => {
            event.stopPropagation();
          }}
          onFocus={(event) => event.stopPropagation()}
        >
          <IconButton
            className="p-0"
            aria-label="more"
            aria-controls={index}
            aria-haspopup="true"
            onClick={(event) => {
              event.stopPropagation();
              handleClick(event);
            }}
            onFocus={(event) => event.stopPropagation()}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            id={index}
            anchorEl={anchorEl}
            keepMounted
            open={openEl == index}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleDetailGateway(row);
                handleClose();
              }}
            >
              <ListItemIcon className={classes.icon_menu}>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
              Details
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDeleteGateway(row._id);
                handleClose();
              }}
            >
              <ListItemIcon className={classes.icon_menu}>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Header
                device={true}
                deviceNotAllow={row.devices.length === 10}
                handleOpenModal={() => handleOpenCreateDeviceModal(row._id)}
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
                  {row.devices.length !== 0 && (
                    <>
                      {row.devices.map((deviceRow) => (
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
              {row.devices.length === 0 && (
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
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    serial: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    devices: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        uid: PropTypes.number,
        vendor: PropTypes.string,
        status: PropTypes.number,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  index: PropTypes.number,
  handleDeleteGateway: PropTypes.func,
  handleDetailGateway: PropTypes.func,
  handleOpenCreateDeviceModal: PropTypes.func,
  handleDeleteDevice: PropTypes.func,
};

export default function CollapsibleTable(props) {
  const {
    data,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleDeleteGateway,
    handleDetailGateway,
    handleOpenCreateDeviceModal,
    handleDeleteDevice,
  } = props;
  const classes = useRowStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Serial</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Updated</TableCell>
            <TableCell align="right">Devices</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        {data.items.length > 0 && (
          <>
          <TableBody>
          {data.items.map((row, index) => (
            <Row
              key={row._id}
              row={row}
              index={index}
              handleDeleteGateway={handleDeleteGateway}
              handleDetailGateway={handleDetailGateway}
              handleOpenCreateDeviceModal={handleOpenCreateDeviceModal}
              handleDeleteDevice={handleDeleteDevice}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              colSpan={8}
              count={data.total}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </>
        )}
        
      </Table>
      {data.items.length === 0 && (
        <div className={classes.container_devices_empty_default}>
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
    </TableContainer>
  );
}
