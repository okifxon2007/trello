import React from 'react'

function HeadSection() {
  return (
        <div className="conta ml-auto mr-auto max-w-[1200px]">
        <div className="trelloheader flex justify-between mt-10">
          <div className="flex items-center">
            <span className="text-4xl font-bold text-gray-900">🔥 Task</span>
          </div>
          <div className="flex items-center">
            <div className="flex -space-x-3">
              
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User 1"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="User 2"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/men/10.jpg"
                alt="User 3"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/men/55.jpg"
                alt="User 4"
              />
              <h3>
                <span className="text-gray-500 text-xl pl-2 ml-4 mt-2">+6</span>
              </h3>
            </div>
            <button className="ml-10 text-blue-500 hover:text-blue-700 text-[30px] translate-y-[-4px]">
              +
            </button>
          </div>
        </div>
    </div>
  )
}

export default HeadSection;