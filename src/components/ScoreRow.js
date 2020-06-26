import React from "react";
import "../styles/Leaderboard.css";

const ScoreRow = (props) => {
  return (
    <tr
      className={
        (props.rank - 1) % 2 === 0 ? "table-row-even" : "table-row-odd"
      }
    >
      <td className="rank">{props.rank}</td>
      <td className="ranked-player">{props.username.toUpperCase()}</td>
      <td className="ranked-score">{props.points}</td>
      <td className="ranked-timer">{props.timer}</td>
      <td className="ranked-distance">{props.max_distance}</td>
      <td className="ranked-coins">{props.coins}</td>
      <td className="ranked-flips">{props.total_flips}</td>
      <td className="ranked-best-flip">
        {props.best_flip}{" "}
        <span className="flip-count-style">x{props.best_flip_count}</span>
      </td>
    </tr>
  );
};

export default ScoreRow;
