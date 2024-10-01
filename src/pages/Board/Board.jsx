
import { Description } from "@mui/icons-material";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const nav = useNavigate();
  const [color, setColor] = useState('');
  const nameref = useRef('');
  const titleref = useRef('');
  const emailref = useRef('');
  const [boardId, setBoardId] = useState(null);
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
   const token = localStorage.getItem('token');
  const validateInputs = () => {
    const nameValue = nameref.current.value.trim();
    const titleValue = titleref.current.value.trim();
   

    if (!nameValue || !titleValue) {
      alert("Iltimos malumot toldiring");
      return false;
    }
    return true;
  };

  useEffect(() => {
    fetch("https://trello.vimlc.uz/api/boards/my-boards", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Server response wasn't OK");
      }
      return res.json();
    })
    .then(data => {
      console.log(data.boards);
      setCards(data.boards);
    })
    
  
  .catch(err => {
    console.log("Error:", err);
  });
  }, []);

  const handleapi = async (e) => {
    e.preventDefault();
    const createcarding = {
      name: nameref.current.value,
      description: titleref.current.value,
      color: color,
    };
    if (!validateInputs()) {
      alert('Malumot mavjud emas');
      return;
    }
    try {
      const resp = await fetch('https://trello.vimlc.uz/api/boards/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization':  `Bearer ${token}`
        },
        body: JSON.stringify(createcarding),
      });

      if (resp.status === 200 || resp.status === 201) {
        alert('Sizning malumotingiz qo\'shildi');
      } else {
        alert('Siz hato malumot kiritdingiz');
      }
    } catch (error) {
      alert('Xatolik yuz berdi');
    }
    console.log(createcarding);
    nameref.current.value = '';
    titleref.current.value = '';
    setColor('');
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
  };

  const boardnav = () => {
    nav("/");
  };

  

 
  const closeModal = () => {
    setIsModalOpen(false); 
    emailref.current.value = ''; 
  };

  function handlpeople(e) {
    e.preventDefault();

    const people = {
      email: emailref.current.value,
      boardId: boardId
    };

    console.log(people);

  }

  return (
    <div className="container mx-auto px-4">
      <div className="header">
        <h1 className="text-black-500 text-xl mt-12">
          {" "}
          <i className="fas fa-chalkboard mr-2"></i> Board
        </h1>
        <br />
        <h2 className="text-black-400">Most popular templates</h2> <br />
        <p className="text-blue-500">
          Get going faster with a template from the Trello community or
        </p>
      </div>
      
      <div className="cardingtemplate flex flex-wrap gap-4">
 
      <div class="relative w-96 h-40 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg p-4 shadow-lg flex flex-col justify-between">
  <h2 class="text-white text-2xl font-semibold">Project Management</h2>
  <div class="flex justify-between items-center">
    <img src="https://img.icons8.com/ios-filled/50/ffffff/trello.png" alt="" className="w-10 h-10" />
  </div>
</div>

<div class="relative w-72 h-40 bg-gradient-to-r from-green-500 to-green-700 rounded-lg p-4 shadow-lg flex flex-col justify-between">
  <h2 class="text-white text-2xl font-semibold">Scrum</h2>
  <div class="flex justify-between items-center">
    <img src="https://img.icons8.com/ios-filled/50/ffffff/trello.png" alt="" className="w-10 h-10" />
  </div>

</div>
<div class="relative w-96 h-40 bg-gradient-to-r from-red-500 to-red-700 rounded-lg p-4 shadow-lg flex flex-col justify-between">
  <h2 class="text-white text-2xl font-semibold">Bug Tracsking</h2>
  <div class="flex justify-between items-center">
    <img src="https://img.icons8.com/ios-filled/50/ffffff/trello.png" alt="" className="w-10 h-10" />
  </div>

</div>
<div class="relative w-72 h-40 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-4 shadow-lg flex flex-col justify-between">
  <h2 class="text-white text-2xl font-semibold">Web desigen process</h2>
  <div class="flex justify-between items-center">
    <img src="https://img.icons8.com/ios-filled/50/ffffff/trello.png" alt="" className="w-10 h-10" />
  </div>
</div>
      </div>

     

      <div className="create">
      <div
       onClick={() => document.getElementById('my_modal_3').showModal()}
  className={`relative w-80 h-28 bg-gradient-to-r from-green-400 via-green-500 to-teal-500 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-110 hover:rotate-2 hover:shadow-2xl cursor-pointer outline-none mb-6 mt-20 overflow-hidden`}
>
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-transparent opacity-20 pointer-events-none"></div>
  
  <h2 className="flex items-center justify-center text-gray-100  font-semibold text-xl pt-10 relative z-10 space-x-2">
    <i className="fas fa-plus-circle text-white text-2xl animate-pulse"></i>
    <span>Create Card</span>
  </h2>
  
  <div className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-500 hover:opacity-100">
    <i className="fas fa-magic text-white text-5xl animate-bounce"></i>
  </div>
</div>

      </div>

      <div className="creatboardpage mt-10">

        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">Create Board</h3>

          <div className="flex justify-center items-center">
            <form className="bg-white p-5 rounded-lg shadow-lg">
              <div className="color">
                <h2>BG-Color</h2>
                <div className="c-df flex gap-6">
                  {['red', 'gray', 'orange', 'green'].map((bgColor) => (
                    <p
                      key={bgColor}
                      className={`w-12 h-6 rounded-sm ${color === bgColor ? "border-2 border-yellow-500" : ""} ${
                        bgColor === 'red' ? 'bg-red-500' :
                          bgColor === 'gray' ? 'bg-gray-500' :
                            bgColor === 'orange' ? 'bg-orange-500' :
                              bgColor === 'green' ? 'bg-green-500' : ''
                      }`}
                      onClick={() => handleColorChange(bgColor)}
                    ></p>
                  ))}
                </div>

                <br /><br />
              </div>
              <label>Board titlee</label> <br />
              <input
                ref={nameref}
                className="input input-bordered input-success w-full max-w-xs"
                type="text"
                placeholder="Board title..."
              />
              <br />
              <label>Visibility</label> <br />
              <input
                ref={titleref}
                className="input input-bordered input-success w-full max-w-xs"
                type="text"
                placeholder="Board visibility..."
              />
              <br /><br />
              <br />
              <button
                onClick={handleapi}
                className="btn btn-outline btn-success mt-4"
              >
                Create
              </button>
            </form>
      <dialog id="my_modal_3" className="modal">
  <div className="modal-box relative">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
    </form>
    <h3 className="font-bold text-lg text-center">Create Board</h3>

    
    <div className="flex justify-center mb-4">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg" 
        alt="User"
        className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-md"
      />
    </div>

    
    <div className="flex justify-around mb-4">
      {[
        'https://randomuser.me/api/portraits/men/32.jpg', 
        'https://picsum.photos/id/1/200/300',
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9' 
      ].map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className="w-16 h-16 rounded-lg shadow-md"
        />
      ))}
    </div>

    {/* Forma */}
    <div className="flex justify-center items-center">
      <form className="bg-white p-5 rounded-lg shadow-lg" onSubmit={handleapi}>
        <div className="color mb-4">
          <h2 className="font-semibold">BG-Color</h2>
          <div className="c-df flex gap-6">
            {['red', 'gray', 'orange', 'green'].map((bgColor) => (
              <p
                key={bgColor}
                className={`w-12 h-6 rounded-sm cursor-pointer ${color === bgColor ? "border-2 border-yellow-500" : ""} ${
                  bgColor === 'red' ? 'bg-red-500' :
                  bgColor === 'gray' ? 'bg-gray-500' :
                  bgColor === 'orange' ? 'bg-orange-500' :
                  bgColor === 'green' ? 'bg-green-500' : ''
                }`}
                onClick={() => handleColorChange(bgColor)}
              ></p>
            ))}
          </div>
          <br />
        </div>

        <label className="font-semibold">Board title</label> <br />
        <input
          ref={nameref}
          className="input input-bordered input-success w-full max-w-xs"
          type="text"
          placeholder="Board title..."
        />
        <br />

        <label className="font-semibold">Visibility</label> <br />
        <input
          ref={titleref}
          className="input input-bordered input-success w-full max-w-xs"
          type="text"
          placeholder="Board visibility..."
        />
        <br />
        
        <button
          type="submit"
          className="btn btn-outline btn-success mt-4"
        >
          Create
        </button>
      </form>
    </div>
  </div>
</dialog>



        <h3 className="font-bold text-lg text-center mt-5">All Boardd</h3>

        <div className="cards-container flex flex-wrap">
          {cards.map((item) => (
            <div
  key={item._id}
  onClick={boardnav}
  className={`relative w-[310px] h-36 p-4 rounded-lg m-4 shadow-lg bg-${item.color}-500 transition-transform duration-500 transform hover:scale-105 hover:shadow-lg hover:-translate-y-2`}
  style={{
    boxShadow: `0px 6px 15px rgba(${item.color === 'red' ? '255, 0, 0' : 
                                  item.color === 'gray' ? '128, 128, 128' : 
                                  item.color === 'orange' ? '255, 165, 0' : 
                                  item.color === 'green' ? '0, 128, 0' : ''}, 0.5)`
  }}
>

  <div>
  <button className=" w-28 h-8 bg-gradient-to-r from-green-400 via-green-500 to-teal-500 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-110 hover:rotate-2 hover:shadow-2xl cursor-pointer outline-none overflow-hidden text-white">
      {item.name}
    </button>
    <h3 className="text-gray-200 mb-4 truncate">
      {item.description}
    </h3>
  </div>

  <div className="absolute bottom-2 left-4 flex items-center justify-between w-full pr-7">
    <button className="btn cursor-pointer bg-white text-gray-700 rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition-all text-sm">
      Add Card
    </button>

    <div className="flex space-x-2">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="User 1"
        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
      />
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="User 2"
        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
      />
    </div>
  </div>

 
  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
    <i className="fas fa-share-alt text-white text-4xl animate-pulse"></i>
  </div>
</div>

          ))}
        </div>
        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <form onSubmit={handlpeople}>
                <h3 className="font-bold text-lg">Share with People</h3> <br />
                <label>Email:</label> <br />
                <input
                  type="email"
                  ref={emailref}
                  className="input input-bordered input-success w-full max-w-xs"
                  placeholder="Enter email..."
                  required
                />
                <br />
                <div className="modal-action">
                  <button type="submit" className="btn">Send Invite</button>
                  <button type="button" onClick={closeModal} className="btn">Close</button>
                </div>
              </form>
            </div>
          </div>
        )}

       
      </div>
    </div>
    </div>
    </div>

  );
};

export default Board;
