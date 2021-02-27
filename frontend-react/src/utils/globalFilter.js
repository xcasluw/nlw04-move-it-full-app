import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      Pesquisar: {' '}
      <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} type="text" />
    </span>
  )
}

export default GlobalFilter;