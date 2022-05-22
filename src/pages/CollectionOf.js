import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Icon from '../components/Icon';
import TaskModal from '../components/TaskModal';

import { useClickOutside, deleteCollection } from '../Core';

function getIndexById (data, id) {
   for (let x=0; x<data.length; x++) {
      if (data[x].id == id) {
         return x;
      }
   }
}

function CollectionOf ({ lists, setLists }) {
   const [taskModal, setTaskModal] = useState(false);
   const [dotMenu, setDotMenu] = useState(false);
   const titleRef = useRef(null);
   const dotMenuRef = useRef(null);

   let { id } = useParams();
   const navigate = useNavigate();
   const listIndex = getIndexById(lists, id);

   useClickOutside(dotMenuRef, () => {
      setDotMenu(false);
   });

   useEffect(() => {
      if (lists[listIndex].name == '') {
         titleRef.current.focus();
      }
   }, []);

   const handleDelete = () => {
      deleteCollection(lists, setLists, listIndex);
      navigate('/collection');
   }

   return (
      <div className="container">

         {taskModal &&
         <TaskModal onClose={setTaskModal} />
         }

         <div className="clt-navbar">
            <div>
               <div onClick={() => navigate(-1)} className="back-btn"><Icon name="down" w="20" h="20" color="#fff" stroke="4" /></div>
               <div>
                  <div className="icon">{lists[listIndex].icon}</div>
                  <div ref={titleRef} untitled={lists[listIndex].name == '' ? "true" : "false"} contentEditable suppressContentEditableWarning>{lists[listIndex].name}</div>
               </div>
            </div>
            <div onClick={() => setDotMenu(true)} className="dot-btn">
               <Icon name="dots" w="30" h="30" color="#fff" stroke="1" />
               {dotMenu &&
               <ul ref={dotMenuRef}>
                  <li>Change Color</li>
                  <li onClick={handleDelete} style={{color: 'red'}}>Delete</li>
               </ul>
               }
            </div>
         </div>

         <div onClick={() => setTaskModal(true)} className="new-task-btn">
            <div style={{backgroundColor: lists[listIndex].color}}><Icon name="plus" w="10" h="10" color="#fff" stroke="1" /></div>
            <div>Add new task</div>
         </div>

         <div className="tasks-list">
            <div className="title">Tasks - 6</div>
            {Array.from(Array(6).keys()).map((index) => 
            <div key={index} className="task-container">
               <div className="checkbox"><Icon name="circle" w="25" h="25" color={lists[listIndex].color} stroke="2" /></div>
               <div className="detail">
                  <div>Finish the essay collaboration</div>
                  <div className="sub-detail">
                     <div>0/1</div>
                     <div>Today</div>
                  </div>
               </div>
            </div>
            )}
         </div>

         <div className="completed-list">
            <div className="title">
               <div>Complete - 5</div>
               <div>Clear</div>
            </div>
            {Array.from(Array(6).keys()).map((index) => 
            <div key={index} className="task-container">
               <div className="checkbox"  style={{backgroundColor: lists[listIndex].color}}><Icon name="check" w="10" h="10" color="#fff" stroke="2" /></div>
               <div className="detail">
                  <div>Finish the essay collaboration</div>
                  <div className="sub-detail">
                     <div>0/1</div>
                     <div>Today</div>
                  </div>
               </div>
            </div>
            )}
         </div>

      </div>
   )
}

export default CollectionOf;
