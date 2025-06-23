import React from 'react';
import loaderImg from "../Assests/loader.gif";
import ReactDOM from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='fixed inset-0 bg-black bg-opacity-70 z-10'>
      <div className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'>
        <img src={loaderImg} alt='loading....' />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = () => {
  return (
    <div className='flex items-center justify-center'>
      <img src={loaderImg} alt='loading....' />
    </div>
  );
};

export default Loader;
