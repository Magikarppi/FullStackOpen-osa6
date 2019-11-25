import React from 'react'
import { connect } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleFilterChange = event => {
    const filter = event.target.value 
    props.addFilter(filter)
    // props.store.dispatch(addFilter(filter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter shown: <input onChange={handleFilterChange} />
    </div>
  )
}

const mapDispatchToProps = {
  addFilter
}

export default connect(null, mapDispatchToProps)(Filter)
// const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

// export default ConnectedFilter