import { useEffect, useRef } from 'react';
import { updateTask, deleteTask } from '../Core';

import Icon from './Icon';

function TaskModal ({ onClose, taskIndex, lists, listIndex, setLists }) {
   const titleRef = useRef(null);

   useEffect(() => {
      if (lists[listIndex].tasks[taskIndex].name == '') {
         titleRef.current.focus();
      }
      titleRef.current.innerText = lists[listIndex].tasks[taskIndex].name;
   }, []);

   const handleKeyDown = (e) => {
      if (e.keyCode == 13) {
         e.preventDefault();
         e.target.blur();
      }
   }

   const handleDeleteTask = () => {
      deleteTask(lists, setLists, listIndex, taskIndex);
      onClose();
   }

   return (
      <div className="modal-screen">
         <div className="modal-container">

            <div className="main">
               <div className="navbar">
                  <div onClick={onClose} className="close-btn"><Icon name="cross" w="10" h="10" color="#90919A" stroke="100" /></div>
               </div>

               <div className="title">
                  {lists[listIndex].tasks[taskIndex].done ?
                     <div className="checkbox"  style={{backgroundColor: lists[listIndex].color}}><Icon name="check" w="10" h="10" color="#fff" stroke="2" /></div>:
                     <div className="checkbox"><Icon name="circle" w="25" h="25" color={lists[listIndex].color} stroke="2" /></div>
                  }
                  <div
                     onKeyDown={handleKeyDown}
                     onInput={(e) => updateTask(lists, setLists, listIndex, taskIndex, 'name', e.target.innerText)} 
                     ref={titleRef}
                     untitled={lists[listIndex].tasks[taskIndex].name == '' ? "true" : "false"} 
                     contentEditable suppressContentEditableWarning
                  >
                  </div>
               </div>

               <div className="setting-section">
                  <div className="sel-clt">
                     <div>Collection</div>
                     <div>
                        <div>{lists[listIndex].icon}</div>
                        <div>Work</div>
                        <Icon name="down" w="15" h="15" color="#fff" stroke="4" />
                     </div>
                  </div>
                  <div>
                     <div>Due date</div>
                     <div>
                        <div>May 21 2022</div>
                        <Icon name="down" w="15" h="30" color="#fff" stroke="4" />
                     </div>
                  </div>
               </div>

               <div 
                  empty={lists[listIndex].tasks[taskIndex].note == '' ? "true" : "false"} 
                  className="note-section"
                  contentEditable suppressContentEditableWarning
               >
               </div>

               <div className="st-section">
                  {lists[listIndex].tasks[taskIndex].sub.map((data, index) =>
                  <div className="st-container">
                     {data.done ?
                        <div className="checkbox"  style={{backgroundColor: lists[listIndex].color}}><Icon name="check" w="10" h="10" color="#fff" stroke="2" /></div>:
                        <div className="checkbox"><Icon name="circle" w="25" h="25" color={lists[listIndex].color} stroke="2" /></div>
                     }
                     <div className={data.done ? "line-through":""}>Buy a tickets</div>
                  </div>
                  )}
                  <div className="st-add">
                     <div className="checkbox"><Icon name="plus" w="10" h="10" color="#90919A" stroke="2" /></div>
                     <div>Add a subtask</div>
                  </div>
               </div>
            </div>
            
            <div className="st-footer">
               <div className="file-list">
                  <div>All files</div>
               </div>
               <div>
                  <div>Add a file</div>
                  <div onClick={handleDeleteTask}>Delete task</div>
               </div>
            </div>

         </div>
      </div>
   )
}

export default TaskModal;
