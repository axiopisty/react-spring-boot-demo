const StatusFilter = ({statusOptions, statusFilter, setStatusFilter}) => {
  const selectionHandler = (event) => {
    const isSelected = event.target.checked;
    if (isSelected) {
      setStatusFilter([...statusFilter, event.target.id]);
    } else {
      setStatusFilter(statusFilter.filter(x => x !== event.target.id));
    }
  }
  return (
    <div>
      <h3>Show issues with status</h3>
      {statusOptions.map(status => (
        <div key={status}>
          <input
            type="checkbox"
            id={status}
            name={status}
            value={status}
            defaultChecked={statusFilter.includes(status)}
            className='status-filter-checkbox'
            onClick={selectionHandler}
          />
          <label htmlFor={status}>{status}</label>
        </div>
      ))}
    </div>
  );
};

export default StatusFilter;