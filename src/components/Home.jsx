import "../App.css";
import axios from 'axios';
import CropCard from './CropCard';
import CropModal from './CropModal';
import ReactPaginate from 'react-paginate';
import CropCraze from "../assets/CropCraze.svg";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Home({ setToasterData }) {
  const navigate = useNavigate();
  const [cropData, setCropData] = useState([]);
  const [modalData, setModalData] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const [currentData, setCurrentData] = useState([]);
  const pageCount = Math.ceil(cropData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % cropData.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    axios.get("https://api-cache-test.leanagri.com/pop/pop_list/en/64/pop_list.json")
      .then(res => {
        setCropData(res.data.data);
      })
      .catch(err => {
        setToasterData({ type: "error", msg: "Something went wrong!" })
      })
  }, [])

  useEffect(() => {
    setCurrentData(cropData.slice(itemOffset, endOffset));
    setFilteredData(cropData.slice(itemOffset, endOffset));
  }, [cropData, itemOffset, endOffset])

  useEffect(() => {
    setFilteredData(currentData.filter(crop =>
      crop.crop_name.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  }, [searchQuery])

  return (
    <div className='home-container'>
      <div className='home-header'>
        <div className='header-inner-cont'>
          <a target='_blank' href='https://krushidukan.bharatagri.com/'>About Us</a>
          <img src={CropCraze} alt="CropCraze" />
          <div onClick={() => navigate("/")}>Log Out</div>
        </div>
      </div>

      <div className='crop-outer-container'>
        <div className='crop-head-cont'>
          <div className="type-head">Types of Crops</div>
          <div class="search-wrapper">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
              placeholder="Filter by Crop name"
            />
          </div>
        </div>

        <div className='crop-main-cont'>
          {filteredData && filteredData.map((crop) => {
            return <CropCard
              cropId={crop.id}
              cropName={crop.crop_name}
              setModalData={setModalData}
              cropUrl={crop.thumbnails[0].image}
            />
          })}
        </div>
      </div>

      {modalData ? <CropModal modalData={modalData} setModalData={setModalData} /> : null}

      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        className="pagination-cont"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item page-item-prev"
        previousLinkClassName="page-link"
        nextClassName="page-item page-item-next"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item page-item-break"
        breakLinkClassName="page-link-break"
        containerClassName="pagination-container"
        activeClassName="active-page-item"
        renderOnZeroPageCount={null}
        disabledClassName="disabled-page-item"
      />
    </div>
  )
}
