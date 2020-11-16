import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
  Fab,
  Tooltip,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    margin: '30px 0 10px 0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Header(props) {
  const classes = useStyles();
  const { device, handleOpenModal, deviceNotAllow } = props;

  return (
    <div className={classes.header}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {device ? 'Devices' : 'Gateways'}
      </Typography>

      <Tooltip
        title={
          !device
            ? 'Add Gateway'
            : deviceNotAllow
            ? 'No more than 10 devices are allowed'
            : 'Insert Device'
        }
        placement="top"
        arrow
      >
        <span>
          {!device ? (
            <Fab
              className={classes.button}
              color="primary"
              aria-label="add"
              size="small"
              onClick={handleOpenModal}
            >
              <AddIcon />
            </Fab>
          ) : (
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.button}
              startIcon={<AddCircleIcon />}
              onClick={handleOpenModal}
              disabled={deviceNotAllow}
            >
              insert
            </Button>
          )}
        </span>
      </Tooltip>
    </div>
  );
}

Header.propTypes = {
  device: PropTypes.bool.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  deviceNotAllow: PropTypes.bool,
};

export default Header;
