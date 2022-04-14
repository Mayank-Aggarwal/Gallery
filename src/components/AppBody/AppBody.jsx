import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import ImageCard from "../ImageCard/ImageCard";
import Modal from "../Modal/Modal";
import { fetchImageData } from '../../actions';
import { getImageUrl } from "../../utils/constants"


const AppBody = () => {
  const [modal, setModal] = useState(null);
  const { imageData = [], page = 1, has_more = false } = useSelector(state => state.appReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImageData(`page=${page}`));
  }, [])

  if (imageData.length === 0) {
    return (
      <div>No Photos Found</div>
    )
  }

  return (
    <>
      <InfiniteScroll
        fetchData={() => dispatch(fetchImageData(`page=${page}`))}
        has_more={has_more}
        >
        {imageData.map((item, index) => {
          return (
            <ImageCard
              key={index}
              src={getImageUrl({ ...item })}
              alt={item.title}
              onClick={() => setModal({ src: getImageUrl({ ...item }), alt: item.title })}
            />
            )
          })}
      </InfiniteScroll>
      {modal  && <Modal modalData={modal} onClose={() => setModal(null)} />}
    </>
  )
}

export default AppBody;