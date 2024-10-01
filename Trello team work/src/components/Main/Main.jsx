import React from 'react';

const Main = () => {
  return (
    <div className="bg-white min-h-screen w-24 flex flex-col items-center justify-between py-5 border-r-2 border-blue-100 absolute">
     
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-blue-500 mb-5"></div>
      </div>
      <div className="flex-grow flex flex-col justify-center space-y-9 absolute mt-20">
        <i className="fas fa-grip-horizontal text-gray-500 hover:text-blue-500 transition duration-300 cursor-pointer text-xl"></i>
        <i className="fas fa-desktop text-gray-500 hover:text-blue-500 transition duration-300 cursor-pointer text-xl"></i>
        <i className="fas fa-book text-gray-500 hover:text-blue-500 transition duration-300 cursor-pointer text-xl"></i>
        <i className="fas fa-cogs text-blue-500 transition duration-300 cursor-pointer text-xl"></i> 
        <i className="fas fa-play-circle text-gray-500 hover:text-blue-500 transition duration-300 cursor-pointer text-xl"></i>
        <i className="fas fa-envelope text-gray-500 hover:text-blue-500 transition duration-300 cursor-pointer text-xl"></i>
      </div>

     
    </div>
  );
}

export default Main;
