import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = () => {
  return <ClipLoader className='flex items-center justify-center font-bold' color={"#123abc"} loading={true} size={150} />;
};

export default Spinner;

