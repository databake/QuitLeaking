// TODO: re-define the shape of the squeeze state to handle view requirements
export default {
  squeezes: {
    longInterval: 10,
    longRepetitions: 10,
    shortRepetitions: 10,
    dailySessions: 3,
    thisWeeksSqueezes: [],
    selectedIndex: new Date().getDay(),
  }
};
