import React from 'react'
import Lottie from 'lottie-react'
import error from "../assets/error.json";

function Error() {
  return (
    <div className='p-20 flex flex-col items-center justify-center'>
      <h1 className='text-3xl '>Error: Page Not Found</h1>
      <p className='text-lg text-gray-500 py-1'>The page you are looking for does not exist.</p>

      <div className='w-1/2 mt-10'>
        <Lottie animationData={error} loop={true} />
      </div>
    </div>
  )
}

export default Error