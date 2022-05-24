import { useEffect, useRef } from 'react';
import { updateTask, deleteTask, updateSubTask, createSubTask, deleteSubTask } from '../Core';

import Icon from './Icon';

function SubTask ({ lists, listIndex, taskIndex, index, onInput, onKeyDown, className }) {
   const titleRef = useRef(null);

   useEffect(() => {
      titleRef.current.innerText = lists[listIndex].tasks[taskIndex].sub[index].name;
   }, []);

   return (
      <div 
         untitled={lists[listIndex].tasks[taskIndex].sub[index].name == '' ? "true" : "false"} 
         className={className}
         onInput={(e) => onInput(e)}
         onKeyDown={onKeyDown}
         ref={titleRef}
         contentEditable suppressContentEditableWarning
      >
      </div>
   )
}

function TaskModal ({ onClose, taskIndex, lists, listIndex, setLists }) {
   const titleRef = useRef(null);
   const noteRef = useRef(null);

   useEffect(() => {
      if (lists[listIndex].tasks[taskIndex].name == '') {
         titleRef.current.focus();
      }
      titleRef.current.innerText = lists[listIndex].tasks[taskIndex].name;
      noteRef.current.innerText = lists[listIndex].tasks[taskIndex].note;
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
                     <div 
                        onClick={() => updateTask(lists, setLists, listIndex, taskIndex, 'done', false)}
                        className="checkbox"  
                        style={{backgroundColor: lists[listIndex].color}}
                     >
                        <Icon name="check" w="25" h="10" color="#fff" stroke="2" />
                     </div>:
                     <div 
                        onClick={() => updateTask(lists, setLists, listIndex, taskIndex, 'done', true)}
                        className="checkbox"
                     >
                        <Icon name="circle" w="25" h="25" color={lists[listIndex].color} stroke="2" />
                     </div>
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
                  onInput={(e) => updateTask(lists, setLists, listIndex, taskIndex, 'note', e.target.innerText)} 
                  empty={lists[listIndex].tasks[taskIndex].note == '' ? "true" : "false"} 
                  ref={noteRef}
                  className="note-section"
                  contentEditable suppressContentEditableWarning
               >
               </div>

               <div className="st-section">
                  {lists[listIndex].tasks[taskIndex].sub.map((data, index) =>
                  <div 
                     onMouseEnter={() => document.getElementById('st-menu-'+index).style.display = 'flex'}
                     onMouseLeave={() => document.getElementById('st-menu-'+index).style.display = 'none'}
                     key={index}
                     className="st-container"
                  >
                     <div>
                        {data.done ?
                           <div 
                              onClick={() => updateSubTask(lists, setLists, listIndex, taskIndex, index, 'done', false)}
                              className="checkbox" 
                              style={{backgroundColor: lists[listIndex].color}}
                           >
                              <Icon name="check" w="10" h="10" color="#fff" stroke="2" />
                           </div>:
                           <div 
                              onClick={() => updateSubTask(lists, setLists, listIndex, taskIndex, index, 'done', true)}
                              className="checkbox"
                           >
                              <Icon name="circle" w="25" h="25" color={lists[listIndex].color} stroke="2" />
                           </div>
                        }
                        <SubTask 
                           className={data.done ? "line-through":""}
                           onInput={(e) => updateSubTask(lists, setLists, listIndex, taskIndex, index, 'name', e.target.innerText)}
                           onKeyDown={handleKeyDown}
                           lists={lists} listIndex={listIndex} taskIndex={taskIndex} index={index} 
                        />
                     </div>
                     <div 
                        onClick={() => deleteSubTask(lists, setLists, listIndex, taskIndex, index)}
                        id={'st-menu-'+index}
                     >
                        <div><Icon name="trash" w="20" h="20" color="rgb(255,0,0,0.2)" stroke="0.2" /></div>
                     </div>
                  </div>
                  )}
                  <div onClick={() => createSubTask(lists, setLists, listIndex, taskIndex)} className="st-add">
                     <div className="checkbox">
                        <Icon name="plus" w="10" h="10" color="#90919A" stroke="2" />
                     </div>
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
