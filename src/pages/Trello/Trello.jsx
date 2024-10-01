import React, { useState, useContext, createContext, useRef, useEffect } from "react";
import { Modal } from "@mui/material";
import HeadSection from "../../components/HeadSection/HeadSection";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ModalContext = createContext();

function Trello() {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [reviewTasks, setReviewTasks] = useState([]);

  const { modalData, openModal, closeModal } = useModal();
  const inputRefs = {
    backlog: useRef(),
    todo: useRef(),
    inProgress: useRef(),
    review: useRef(),
  };

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;

    const sourceTasks = getTasksById(source.droppableId);
    const destinationTasks = getTasksById(destination.droppableId);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    destinationTasks.splice(destination.index, 0, movedTask);
    setTasksById(source.droppableId, sourceTasks);
    setTasksById(destination.droppableId, destinationTasks);
  }

  function getTasksById(id) {
    switch (id) {
      case "backlog": return backlogTasks;
      case "todo": return todoTasks;
      case "inProgress": return inProgressTasks;
      case "review": return reviewTasks;
      default: return [];
    }
  }

  function setTasksById(id, tasks) {
    switch (id) {
      case "backlog": setBacklogTasks(tasks); break;
      case "todo": setTodoTasks(tasks); break;
      case "inProgress": setInProgressTasks(tasks); break;
      case "review": setReviewTasks(tasks); break;
      default: break;
    }
  }

  return (
    <ModalContext.Provider value={{ modalData, openModal, closeModal }}>
      <div className="container mx-auto max-w-[1200px]">
        <HeadSection />
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskBoard 
            tasks={{
              backlog: [backlogTasks, setBacklogTasks],
              todo: [todoTasks, setTodoTasks],
              inProgress: [inProgressTasks, setInProgressTasks],
              review: [reviewTasks, setReviewTasks],
            }}
            inputRefs={inputRefs}
          />
        </DragDropContext>
        <CustomModal modalData={modalData} closeModal={closeModal} />
      </div>
    </ModalContext.Provider>
  );
}

function TaskBoard({ tasks, inputRefs }) {
  return (
    <div className="mt-8 bg-white shadow p-6 grid grid-cols-4 gap-6">
      {Object.keys(tasks).map((columnId) => {
        const [taskList, setTaskList] = tasks[columnId];
        return (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-4 capitalize">{columnId}</h3>
                {taskList.map((task, index) => (
                  <Draggable key={task.id} draggableId={`${columnId}-${task.id}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer"
                      >
                        <TaskCard task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <input
                  ref={inputRefs[columnId]}
                  className="w-full p-2 mt-4 rounded-md outline-none"
                  type="text"
                  placeholder={`Add ${columnId}`}
                />
                <button
                  className="w-full text-blue-500 mt-4"
                  onClick={() => addTask(setTaskList, inputRefs[columnId])}
                >
                  + Add Task
                </button>
              </div>
            )}
          </Droppable>
        );
      })}
    </div>
  );
}

function addTask(setTasks, inputRef) {
  const newTaskTitle = inputRef.current.value;
  if (newTaskTitle) {
    const newTask = {
      title: newTaskTitle,
      description: "",
      status: "Pending",
      priority: "Medium",
      dueDate: null,
      boardId: Date.now(),
      assignedTo: null,
    };

    axios.post("https://trello.vimlc.uz/api/tasks/create", newTask)
      .then(response => {
        setTasks(prevTasks => [...prevTasks, response.data]);
        inputRef.current.value = ""; 
      })
      .catch(error => {
        console.error("Error creating task:", error);
      });
  }
}

function TaskCard({ task }) {
  const { openModal } = useContext(ModalContext);

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer"
      onClick={() => openModal(task)}
    >
      <h4 className="font-semibold">{task.title}</h4>
      <p>{task.description || 'No description'}</p>
    </div>
  );
}

// Modalni boshqarish uchun hook
function useModal() {
  const [modalData, setModalData] = useState(null);

  const openModal = (task) => {
    setModalData(task);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return { modalData, openModal, closeModal };
}

function CustomModal({ modalData, closeModal }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [checklistItems, setChecklistItems] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (modalData) {
      setTaskTitle(modalData.title || "");
      setDescription(modalData.description || "");
      setChecklistItems(modalData.checklist || []);
    }
  }, [modalData]);

  if (!modalData) return null;

  const handleAddComment = () => {
    if (newComment) {
      axios.post(`https://trello.vimlc.uz/api/tasks/${modalData.id}/comment`, { comment: newComment })
        .then(response => {
          setChecklistItems((prevItems) => [...prevItems, response.data]);
          setNewComment(""); 
        })
        .catch(error => console.error("Error adding comment:", error));
    }
  };

  return (
    <Modal open={Boolean(modalData)} onClose={closeModal}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg w-[800px] h-[600px] flex shadow-xl p-6 relative">
          <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500">
            &times;
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
            className="mt-4 w-full h-32 p-2 rounded-md outline-none dark:bg-gray-700 dark:text-white"
          />
          <div className="mt-4">
            <h4 className="font-semibold">Checklist:</h4>
            <ul>
              {checklistItems.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="New checklist item"
              value={newChecklistItem}
              onChange={(e) => setNewChecklistItem(e.target.value)}
              className="mt-2 w-full p-2 rounded-md outline-none dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={() => {
                if (newChecklistItem) {
                  setChecklistItems((prevItems) => [...prevItems, newChecklistItem]);
                  setNewChecklistItem("");
                }
              }}
              className="mt-2 text-blue-500"
            >
              Add to checklist
            </button>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Comments:</h4>
            <ul>
              {modalData.comments.map((comment, index) => (
                <li key={index} className="flex justify-between">
                  <span>{comment}</span>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mt-2 w-full p-2 rounded-md outline-none dark:bg-gray-700 dark:text-white"
            />
            <button onClick={handleAddComment} className="mt-2 text-blue-500">
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Trello;
