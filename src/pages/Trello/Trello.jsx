import React, { useState, useContext, createContext, useRef, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

const ModalContext = createContext();

function Trello() {
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inProgress: [],
    review: []
  });
  const [modalData, setModalData] = useState(null);
  const inputRefs = {
    backlog: useRef(),
    todo: useRef(),
    inProgress: useRef(),
    review: useRef(),
  };
  const params = useParams();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const token = localStorage.getItem('token');
    axios.get(`https://trello.vimlc.uz/api/tasks/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const groupedTasks = groupTasksByStatus(response.data.tasks);
        setTasks(groupedTasks);
      })
      .catch(error => console.error("Error fetching tasks:", error));
  };

  const groupTasksByStatus = (tasks) => {
    return tasks.reduce((acc, task) => {
      const status = task.status.toLowerCase();
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(task);
      return acc;
    }, {
      backlog: [],
      todo: [],
      inProgress: [],
      review: []
    });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    setTasks(prev => {
      const newTasks = { ...prev };
      const [movedTask] = newTasks[source.droppableId].splice(source.index, 1);
      newTasks[destination.droppableId].splice(destination.index, 0, movedTask);
      return newTasks;
    });
  };

  const addTask = (columnId) => {
    const newTaskTitle = inputRefs[columnId].current.value.trim(); 
    const token = localStorage.getItem('token');     
    if (newTaskTitle) {
      const newTask = {
        title: newTaskTitle,        
        // description: newTaskTitle,  
        // status: columnId,
        // priority: "Medium",
        // dueDate: new Date().toISOString(),
        boardId: params.id, 
        // assignedTo: 'asignedto',
      };

      axios.post(
        "https://trello.vimlc.uz/api/tasks/create",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      )
      .then((response) => {
         window.location.reload()
      })
      .catch(error => {
        console.log( error);
      });
    }    
  };



  const openModal = (task) => {
    setModalData(task);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ modalData, openModal, closeModal }}>
      <div className="container mx-auto max-w-[1200px]">
        <h1 className="text-2xl font-bold mb-4">Trello Board</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(tasks).map(([columnId, columnTasks]) => (
              <Column 
                key={columnId}
                columnId={columnId}
                tasks={columnTasks}
                inputRef={inputRefs[columnId]}
                addTask={addTask}
              />
            ))}
          </div>
        </DragDropContext>
        {modalData && <TaskModal task={modalData} closeModal={closeModal} />}
      </div>
    </ModalContext.Provider>
  );
}

function Column({ columnId, tasks, inputRef, addTask }) {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-100 p-4 rounded-lg"
        >
          <h2 className="text-lg font-semibold mb-4 capitalize">{columnId}</h2>
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
          <input
            ref={inputRef}
            className="w-full p-2 mt-4 rounded-md outline-none"
            type="text"
            placeholder={`Add task to ${columnId}`}
          />
          <button
            className="w-full bg-blue-500 text-white mt-2 p-2 rounded-md"
            onClick={() => addTask(columnId)}
          >
            Add Task
          </button>
        </div>
      )}
    </Droppable>
  );
}

function TaskCard({ task, index }) {
  const { openModal } = useContext(ModalContext);

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer"
          onClick={() => openModal(task)}
        >
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
}

function TaskModal({ task, closeModal }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically update the task via API
    console.log("Updating task:", { ...task, title, description });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2 mb-4 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          />
          <textarea
            className="w-full p-2 mb-4 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            rows="3"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Trello;