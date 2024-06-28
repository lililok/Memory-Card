import React from 'react';

function Card({ name, icon, onClick }) {
    return (
      <div className="card" onClick={onClick}>
        <img src={icon} alt={name} />
        <h3>{name}</h3>
      </div>
    );
  }
  
  export default Card;