import React, { useState, useContext, useRef, useEffect, createContext } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { FaTimes, FaEdit, FaTrash, FaUser, FaTags, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalContext = createContext();

function Trello() {
  const [tasks, setTasks] = useState({ backlog: [], todo: [], inProgress: [], review: [] });
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRefs = { backlog: useRef(), todo: useRef(), inProgress: useRef(), review: useRef() };
  const params = useParams();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    axios.get(`https://trello.vimlc.uz/api/tasks/${params.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        const groupedTasks = groupTasksByStatus(response.data.tasks);
        setTasks(groupedTasks);
      })
      .catch(error => console.error("Error fetching tasks:", error))
      .finally(() => setLoading(false));
  };

  const groupTasksByStatus = (tasks) => {
    return tasks.reduce((acc, task) => {
      const status = task.status.toLowerCase();
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(task);
      return acc;
    }, { backlog: [], todo: [], inProgress: [], review: [] });
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
      const newTask = { title: newTaskTitle, boardId: params.id };
      axios.post("https://trello.vimlc.uz/api/tasks/create", newTask, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => fetchTasks())
        .catch(error => console.log(error));
    }
  };

  const openModal = (task) => {
    setModalData(task);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const updateTask = (updatedTask) => {
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      Object.keys(newTasks).forEach(columnId => {
        const taskIndex = newTasks[columnId].findIndex(t => t.id === updatedTask.id);
        if (taskIndex !== -1) {
          newTasks[columnId][taskIndex] = updatedTask;
        }
      });
      return newTasks;
    });
  };

  return (
    <ModalContext.Provider value={{ modalData, openModal, closeModal, updateTask }}>
      <div className="container mx-auto max-w-[1200px]">
        <h1 className="text-2xl font-bold mb-4">Trello Board</h1>
        {loading ? <p>Loading...</p> : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(tasks).map(([columnId, columnTasks]) => (
                <Column key={columnId} columnId={columnId} tasks={columnTasks} inputRef={inputRefs[columnId]} addTask={addTask} />
              ))}
            </div>
          </DragDropContext>
        )}
        {modalData && <TaskModal task={modalData} closeModal={closeModal} />}
      </div>
    </ModalContext.Provider>
  );
}

function Column({ columnId, tasks, inputRef, addTask }) {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 capitalize">{columnId}</h2>
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
          <input ref={inputRef} className="w-full p-2 mt-4 rounded-md outline-none" type="text" placeholder={`Add task to ${columnId}`} />
          <button className="w-full bg-blue-500 text-white mt-2 p-2 rounded-md" onClick={() => addTask(columnId)}>Add Task</button>
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
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer" onClick={() => openModal(task)}>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>

          {task.assignee && (
            <div className="mt-2 flex items-center">
              <FaUser className="text-gray-500" />
              <span className="ml-2 text-sm">{task.assignee}</span>
            </div>
          )}

          {task.priority && (
            <div className="mt-2 flex items-center">
              <FaTags className="text-gray-500" />
              <span className="ml-2 text-sm">{task.priority}</span>
            </div>
          )}

          {task.dueDate && (
            <div className="mt-2 flex items-center">
              <FaCalendarAlt className="text-gray-500" />
              <span className="ml-2 text-sm">{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}


function TaskModal({ task, closeModal }) {
  const [description, setDescription] = useState(task.description || '');
  const [dueDate, setDueDate] = useState(task.dueDate ? new Date(task.dueDate) : new Date());
  const [priority, setPriority] = useState(task.priority || '');
  const [assignee, setAssignee] = useState(task.assignee || '');

  const { updateTask } = useContext(ModalContext);

  const assignUser = () => {
    const user = prompt("Kimni vazifaga tayinlamoqchisiz?");
    if (user) {
      setAssignee(user);
    }
  };

  const setTaskPriority = () => {
    const priorities = ["Past", "O'rta", "Yuqori"];
    const selectedPriority = prompt("Muhimlikni kiriting: Past, O'rta, Yuqori", priority);
    if (priorities.includes(selectedPriority)) {
      setPriority(selectedPriority);
    }
  };

  const handleSave = () => {
    const updatedTask = { ...task, description, dueDate, priority, assignee };

    const token = localStorage.getItem("token");

    axios
      .put(`https://trello.vimlc.uz/api/tasks/${task.id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        updateTask(response.data.task);
        closeModal();
        toast.success("Vazifa muvaffaqiyatli yangilandi!");
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        toast.error("Vazifa yangilanayotganda xato yuz berdi!");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-4 bg-gray-800 text-white rounded-lg max-w-lg w-full">
        <h3 className="text-lg font-bold mb-2">Vazifa Tafsilotlari</h3>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded-md mb-2"
          placeholder="Vazifa haqida tafsilotlarni kiriting"
        />
        <div className="flex justify-between items-center mb-2">
          <button className="bg-blue-500 p-2 rounded-md text-white" onClick={assignUser}>
            <FaUser className="w-32"/>
            Tayinlash
          </button>
          <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} className="w-32 p-4 bg-gray-700 text-white rounded-md" />
          <button className="bg-yellow-500 p-2 rounded-md text-white" onClick={setTaskPriority}>
            <FaTags className="w-32"/>
            Prioritet
          </button>
        </div>
        <div className="flex justify-between">
          <button onClick={closeModal} className="bg-red-500 p-2 rounded-md mr-2">
            <FaTimes className="w-32"/>
            Bekor qilish
          </button>
          <button onClick={handleSave} className="bg-green-500 p-2 rounded-md">
            <FaEdit className="w-32" />
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}

export default Trello;
