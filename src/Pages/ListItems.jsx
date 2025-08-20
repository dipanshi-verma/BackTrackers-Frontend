import React from 'react'

const ListItems = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900">List Items</h2>
          <p className="text-gray-700 mt-4">Here you can view all reported items.</p>
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 lg:p-16 w-full max-w-2xl mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Items List</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray
                  text-white flex items-center justify-center">
                  <span className="text-sm">1</span>
                </div>
                <div className="text-gray-800">
                  <h4 className="font-semibold">Item Name 1</h4>
                  <p className="text-sm text-gray-600">Description of item 1.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray
                  text-white flex items-center justify-center">
                  <span className="text-sm">2</span>
                </div>
                <div className="text-gray-800">
                  <h4 className="font-semibold">Item Name 2</h4>
                  <p className="text-sm text-gray-600">Description of item 2.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray
                  text-white flex items-center justify-center">
                  <span className="text-sm">3</span>
                </div>
                <div className="text-gray-800">
                  <h4 className="font-semibold">Item Name 3</h4>
                  <p className="text-sm text-gray-600">Description of item 3.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListItems