import React from 'react';

function Dashboard() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <FileCard title="Documents" files="24 files" icon="📄" />
          <FileCard title="Music" files="102 files" icon="🎵" />
          <FileCard title="Work Project" files="84 files" icon="💼" />
          <FileCard title="Personal Media" files="2450 files" icon="📷" />
        </div>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Available Storage</h3>
            <span className="text-gray-500 text-lg">130GB used of 512GB</span>
          </div>

          <div className="relative bg-gray-200 rounded-full h-4 mb-4">
            <div className="absolute top-0 left-0 h-full bg-blue-600 rounded-full" style={{ width: '85%' }}></div>
          </div>

          <div className="mt-6 space-y-4">
            <StorageItem name="Media" size="86 GB" color="bg-blue-600" />
            <StorageItem name="Documents" size="26 GB" color="bg-yellow-500" />
            <StorageItem name="Music" size="10 GB" color="bg-purple-500" />
            <StorageItem name="Other Files" size="18 GB" color="bg-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FileCard({ title, files, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-gray-500">{files}</p>
    </div>
  );
}

function StorageItem({ name, size, color }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700 font-medium">{name}</span>
      <span className="text-gray-500">{size}</span>
      <div className={`w-2/3 h-2 ${color} rounded-full ml-4`}></div>
    </div>
  );
}

export default Dashboard;
