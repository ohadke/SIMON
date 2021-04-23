export const initialState = {
  historyScore: [],
  name: "",
  currentScore: 0,
};

// Add items by action
const reducer = (state, action) => {
  switch (action.type) {
    // Add score to the list and sorting it be highest score
    case "SCORE_LIST":
      console.log();
      let newScoreList = [...state.historyScore];
      newScoreList.push(action.item);
      newScoreList.sort(
        (a, b) => Number(b.currentScore) - Number(a.currentScore)
      );

      console.log(newScoreList);

      return {
        ...state,
        historyScore: newScoreList,
      };

    case "ADD_USER":
      return {
        ...state,
        name: action.name,
      };

    default:
      return state;
  }
};

export default reducer;
