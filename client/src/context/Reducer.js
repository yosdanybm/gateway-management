const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_GATEWAY':
      return {
        ...state,
        gateway: action.payload,
      };
    case 'SET_ID_CURRENT_GATEWAY':
      return {
        ...state,
        currentIDGateway: action.payload,
        currentIDDevice: null,
      };
    case 'SET_ID_CURRENT_DEVICE':
      return {
        ...state,
        currentIDDevice: action.payload,
        currentIDGateway: null,
      };
    default:
      return state;
  }
};

export default Reducer;
