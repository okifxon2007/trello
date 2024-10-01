import React from 'react';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
        </div>

        <div className="grid grid-cols-4 gap-4">
          <FileCard title="Documents" files="24 files" />
          <FileCard title="Music" files="102 files" />
          <FileCard title="Work Project" files="84 files" />
          <FileCard title="Personal Media" files="2450 files" />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Available Storage</h3>
          <div className="flex items-center justify-between">
            <span>130GB / 512GB</span>
            <div className="w-full h-2 bg-gray-200 rounded-lg overflow-hidden ml-4">
              <div className="bg-blue-500 h-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <StorageItem name="Media" size="86 GB" color="bg-blue-500" />
            <StorageItem name="Documents" size="26 GB" color="bg-yellow-500" />
            <StorageItem name="Music" size="10 GB" color="bg-purple-500" />
            <StorageItem name="Other Files" size="18 GB" color="bg-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FileCard({ title, files }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">{title}</h4>
        <span className="bg-blue-100 text-blue-500 p-1 rounded-full">A</span>
      </div>
      <p className="text-gray-600 mt-2">{files}</p>
    </div>
  );
}

function StorageItem({ name, size, color }) {
  return (
    <div className="flex items-center justify-between">
      <span>{name}</span>
      <span className="text-gray-600">{size}</span>
      <div className={`w-2/3 h-2 ${color} rounded-full ml-4`}></div>
    </div>
  );
}

export default Dashboard;
