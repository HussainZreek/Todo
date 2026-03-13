
const Filter = ({filter, setFilter, filterImportant, setFilterImportant}) => {
   
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleImportantFilterChange = (event) => {
        setFilterImportant(event.target.checked)
    }

   
    return (
     <div className="filter-section">
           Filter by task: <input value={filter} onChange={handleFilterChange}/>
        <div className="checkbox-group">
            Filter by importance: <input checked={filterImportant} type="checkbox" onChange={handleImportantFilterChange}/>
        </div>
    </div>
    )
}

export default Filter