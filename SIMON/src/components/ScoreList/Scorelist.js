import React from "react";
import { Typography } from "@material-ui/core";
import { useStateValue } from "../../utlils/StateProvider";

function Scorelist() {
  const [{ historyScore }, dispatch] = useStateValue();

  // Formating the messages date and time
  const dateFormatter = (timeStamp) => {
    let date = new Date(timeStamp);
    let dateString =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    return dateString;
  };

  return (
    <div>
      <Typography variant="h5">History Score:</Typography>
      {historyScore.map((player) => (
        <Typography variant="h6">
          {player.name} {player.currentScore} {dateFormatter(player.date)}
        </Typography>
      ))}
    </div>
  );
}

export default Scorelist;
