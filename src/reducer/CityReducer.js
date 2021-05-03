const CityReducer = (state, action) => {
  switch (action.type) {
    case "SET_LAT_AND_LON":
      return {
        ...state,
        coordinate: action.payload,
      };
    default:
      return state;
  }
};

export default CityReducer;
