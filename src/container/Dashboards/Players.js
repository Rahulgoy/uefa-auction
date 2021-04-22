import React from "react";

const Players = ({ players }) => {
  //console.log("length", players.length);
  if (players.length < 1) {
    return <p>No Players Available</p>;
  }
  return (
    <div className="section-center">
      {players.map((player) => {
        return (
          <table key={player.id} className="menu-item">
            <tr className="item-info">
              <th>Name</th>
              <th>Rating</th>
              <th>Wage</th>
              <th>Base Price</th>
              <th>Highest Bid</th>
            </tr>
            <tr>
              <td>{player.data.name}</td>
              <td>{player.data.rating}</td>
              <td>{player.data.wage}</td>
              <td className="item-text">{player.data.baseprice}</td>
              <td className="price">{player.data.maxbid}</td>
            </tr>
          </table>
        );
      })}
    </div>
  );
};

export default Players;
