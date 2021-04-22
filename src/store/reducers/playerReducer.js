const initState = {
  silentPlayer: [],
};

const silentplayerReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_BID":
      console.log("Bid Added Successfully");
      return state;
    case "ADD_BID_ERROR":
      console.log("Bid adding error");
      return state;
    default:
      return state;
  }
};

export default silentplayerReducer;
