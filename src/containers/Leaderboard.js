import React from "react";
import ScoreRow from "../components/ScoreRow";
import "../styles/Leaderboard.css";

const Leaderboard = (props) => {
  const orderedScores = [...props.scores].sort(
    (scoreA, scoreB) => scoreB.points - scoreA.points
  );
  const topTen = orderedScores.slice(0, 10);

  return (
    <div className="leaderboard-container">
      <p className="leaderboard-heading">LEADERS</p>
      <table className="table">
        <thead className="table-head">
          <tr>
            <th className="table-header-title">RANK</th>
            <th className="table-header-title">PLAYER</th>
            <th className="table-header-title">SCORE</th>
            <th className="table-header-title">TIMER</th>
            <th className="table-header-title">MAX DISTANCE</th>
            <th className="table-header-title">COINS</th>
            <th className="table-header-title">FLIPS</th>
            <th className="table-header-title">BEST FLIP</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {topTen.map((score, index) => (
            <ScoreRow key={score.id} rank={index + 1} {...score} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
