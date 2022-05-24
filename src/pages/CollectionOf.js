import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Icon from '../components/Icon';
import TaskModal from '../components/TaskModal';
import ColorModal from '../components/ColorModal';
import EmojiPicker from '../components/EmojiPicker';

import { 
   useClickOutside, 
   deleteCollection, 
   updateCollection, 
   getEmojiColor,
   createTask,
   updateTask,
} from '../Core';

function getIndexById (data, id) {
   for (let x=0; x<data.length; x++) {
      if (data[x].id == id) {
         return x;
      }
   }
}

function CollectionOf ({ lists, setLists }) {
   const [taskIndex, setTaskIndex] = useState(null);
   const [taskModal, setTaskModal] = useState(false);
   const [colorModal, setColorModal] = useState(false);
   const [dotMenu, setDotMenu] = useState(false);
   const [emojiSel, setEmojiSel] = useState(false);
   const titleRef = useRef(null);
   const dotMenuRef = useRef(null);
   const epRef = useRef(null);

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
      titleRef.current.innerText = lists[listIndex].name;
   }, []);

   const handleDelete = () => {
      deleteCollection(lists, setLists, listIndex);
      navigate('/collection');
   }

   const handleUpdateIcon = (emoji) => {
      updateCollection(lists, setLists, listIndex, 'icon', emoji)
      updateCollection(lists, setLists, listIndex, 'color', getEmojiColor(emoji))
      setEmojiSel(false);
   }

   const handleKeyDown = (e) => {
      if (e.keyCode == 13) {
         e.preventDefault();
         e.target.blur();
      }
   }

   const handleOpenTask = (id, e) => {
      const index = getIndexById(lists[listIndex].tasks, id);
      setTaskIndex(index);
      setTaskModal(true);
   }

   const handleCreateTask = () => {
      createTask(lists, setLists, listIndex);
      setTaskIndex(lists[listIndex].tasks.length-1);
      setTaskModal(true);
   }

   return (
      <div className="container">

         {taskModal &&
            <TaskModal onClose={() => setTaskModal(false)} taskIndex={taskIndex} lists={lists} listIndex={listIndex} setLists={setLists} />
         }

         {colorModal &&
            <ColorModal 
               onClose={() => setColorModal(false)} 
               lists={lists}
               setLists={setLists}
               listIndex={listIndex}
            />
         }

         <div className="clt-navbar">
            <div>
               <div onClick={() => navigate(-1)} className="back-btn"><Icon name="down" w="20" h="20" color="#fff" stroke="4" /></div>
               <div>
                  <div className="icon">
                     <div onClick={() => setEmojiSel(true)}>{lists[listIndex].icon}</div>
                     {emojiSel &&
                        <EmojiPicker onClose={() => setEmojiSel(false)} onSelect={handleUpdateIcon} />
                     }
                  </div>
                  <div 
                     onInput={(e) => updateCollection(lists, setLists, listIndex, 'name', e.target.innerText)} 
                     onKeyDown={handleKeyDown}
                     ref={titleRef} 
                     untitled={lists[listIndex].name == '' ? "true" : "false"} 
                     contentEditable suppressContentEditableWarning
                  >
                  </div>
               </div>
            </div>
            <div onClick={() => setDotMenu(true)} className="dot-btn">
               <Icon name="dots" w="30" h="30" color="#fff" stroke="1" />
               {dotMenu &&
               <ul ref={dotMenuRef}>
                  <li onClick={() => setColorModal(true)} >Change Color</li>
                  <li onClick={handleDelete} style={{color: 'red'}}>Delete</li>
               </ul>
               }
            </div>
         </div>

         <div onClick={handleCreateTask} className="new-task-btn">
            <div style={{backgroundColor: lists[listIndex].color}}><Icon name="plus" w="10" h="10" color="#fff" stroke="1" /></div>
            <div>Add new task</div>
         </div>

         <div className="tasks-list">
            <div className="title">Todo List - {lists[listIndex].tasks.filter(el => el.done == false).length}</div>
            {lists[listIndex].tasks.filter(el => el.done == false).map((data, index) => 
            <div key={index} className="task-container">
               <div 
                  onClick={() => updateTask(lists, setLists, listIndex, getIndexById(lists[listIndex].tasks, data.id), 'done', true)} 
                  className="checkbox"
               >
                  <Icon name="circle" w="25" h="25" color={lists[listIndex].color} stroke="2" />
               </div>
               <div onClick={(e) => handleOpenTask(data.id, e)} className="detail">
                  <div className="title" untitled={data.name == '' ? 'true':'false'}>{data.name}</div>
                  <div className="sub-detail">
                     {data.sub.length > 0 &&
                     <div>0/1</div>
                     }
                     <div>Today</div>
                  </div>
               </div>
            </div>
            )}
         </div>

         <div className="completed-list">
            <div className="title">
               <div>Completed - {lists[listIndex].tasks.filter(el => el.done == true).length}</div>
               <div>Clear</div>
            </div>
            {lists[listIndex].tasks.filter(el => el.done == true).map((data, index) => 
            <div key={index} className="task-container completed-container">
               <div 
                  onClick={() => updateTask(lists, setLists, listIndex, getIndexById(lists[listIndex].tasks, data.id), 'done', false)} 
                  className="checkbox"  
                  style={{backgroundColor: lists[listIndex].color}}
               >
                  <Icon name="check" w="25" h="10" color="#fff" stroke="2" />
               </div>
               <div onClick={() => handleOpenTask(data.id)} className="detail">
                  <div untitled={data.name == '' ? 'true':'false'}>{data.name}</div>
                  <div className="sub-detail">
                  </div>
               </div>
            </div>
            )}
         </div>

      </div>
   )
}

export default CollectionOf;
