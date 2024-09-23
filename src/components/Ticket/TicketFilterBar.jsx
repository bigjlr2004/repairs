export const TicketFilterBar = ({ setShowEmergencyOnly, setSearchTerm }) => {
  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };
  return (
    <div className="filter-bar">
      <button
        className="filter-btn btn-primary"
        onClick={() => setShowEmergencyOnly(true)}
      >
        Emergency
      </button>
      <button
        className="filter-btn btn-info"
        onClick={() => setShowEmergencyOnly(false)}
      >
        Show All
      </button>
      <input
        type="text"
        placeholder="Search for tickets"
        onChange={(evt) => handleChange(evt)}
        className="ticket-search"
      />
    </div>
  );
};
