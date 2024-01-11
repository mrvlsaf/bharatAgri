import React from 'react'

function CropCard({ cropId, cropName, setModalData, cropUrl }) {
    return (
        <div key={cropId} onClick={() => setModalData(cropUrl)} className='crop-card-cont'>
            <div className='crop-image-cont'><img src={cropUrl} alt={cropUrl} /></div>
            <div>{cropName}</div>
        </div>
    )
}

export default CropCard