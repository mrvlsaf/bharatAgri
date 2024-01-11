import React from 'react'

export default function CropModal({ modalData, setModalData }) {
    return (
        <div className='crop-modal-backdrop'>
            <div className='crop-modal-cont'>
                <div><img src={modalData} alt="modalData" /></div>
                <span onClick={() => setModalData(null)}><i className="fa-solid fa-times"></i></span>
            </div>
        </div>
    )
}
