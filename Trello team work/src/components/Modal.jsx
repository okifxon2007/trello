import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

function TaskModal({ modalData, closeModal }) {
  const [taskTitle, setTaskTitle] = useState(modalData?.title || '');
  const [description, setDescription] = useState(modalData?.description || '');
  const [newComment, setNewComment] = useState('');
  const [checklistItems, setChecklistItems] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');

  useEffect(() => {
    if (modalData) {
      axios.get(`https://trello.vimlc.uz/api/tasks/${modalData.taskId}`)
        .then(response => {
          const task = response.data;
          setTaskTitle(task.title);
          setDescription(task.description);
        })
        .catch(error => console.error('Error fetching task details:', error));
    }
  }, [modalData]);

  const saveTask = () => {
    const taskPayload = { title: taskTitle, description };
    axios.post(`https://trello.vimlc.uz/api/tasks/create`, taskPayload)
      .then(response => console.log('Task created/updated', response.data))
      .catch(error => console.error('Error saving task:', error));
  };

  const addChecklistItem = (item) => {
    setChecklistItems([...checklistItems, item]);
    setNewChecklistItem('');
  };

  const addComment = () => {
    axios.post(`https://trello.vimlc.uz/api/tasks/${modalData.taskId}/comments`, { comment: newComment })
      .then(response => console.log('Comment added', response.data))
      .catch(error => console.error('Error adding comment:', error));
    setNewComment('');
  };

  return (
    <Modal open={Boolean(modalData)} onClose={closeModal}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg w-[800px] h-[600px] flex shadow-xl p-6 relative">
          <div className="w-2/3 pr-4">
            <button onClick={closeModal} className="absolute top-4 right-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-xl font-semibold w-full dark:bg-gray-700 dark:text-white"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task Description"
              className="w-full mt-4 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <input
              type="text"
              placeholder="Добавить пункт чек-листа"
              value={newChecklistItem}
              onChange={(e) => setNewChecklistItem(e.target.value)}
              className="mt-4 w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <div className="mt-4">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <button onClick={() => addChecklistItem(newChecklistItem)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
              Добавить чеклист
            </button>

            <div className="mt-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Напишите комментарий"
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button onClick={addComment} className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                Добавить комментарий
              </button>
            </div>
          </div>

          <div className="w-1/3 border-l border-gray-200 dark:border-gray-600 pl-4 flex flex-col justify-between">
            <div>
              <button className="w-48 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 py-2 px-4 mb-2 rounded-lg">
                Участники
              </button>
              <button className="w-48 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 py-2 px-4 mb-2 rounded-lg">
                Метки
              </button>
              <button className="w-48 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 py-2 px-4 mb-2 rounded-lg">
                Чек-лист
              </button>
              <button className="w-48 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 py-2 px-4 mb-2 rounded-lg">
                Даты
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TaskModal;
