import React from 'react'
import EngineeringIcon from '@mui/icons-material/Engineering';

const UnderConstruction = ({page}) => {
  return (
    <div>

        <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
            <EngineeringIcon style={{ fontSize: '100px', color: '#007682' }} />
            <h1 style={{ color: '#007682' }}>Under Construction</h1>
            <p style={{ color: '#555' }}>The {page} is currently under construction. Please check back sooner or later.</p>
        </div>  

      
    </div>
  )
}

export default UnderConstruction
