export const Filter = ({ filterChange, value }) => {
  return (
    <div>
      <input type="text" value={value} onChange={filterChange} />
    </div>
  );
};
