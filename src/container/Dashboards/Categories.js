import React from "react";

const Categories = ({ filterPlayers, categories }) => {
  return (
    <div className="btn-container">
      {categories.map((category) => {
        // console.log(category);
        return (
          <button
            type="button"
            className="filter-btn"
            key={category.id}
            onClick={() => filterPlayers(category.data, category.id)}
          >
            {category.data}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
