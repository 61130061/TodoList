import Icon from './Icon';

function TaskModal ({ onClose }) {

   return (
      <div className="modal-screen">
         <div className="modal-container">

            <div className="main">
               <div className="navbar">
                  <div onClick={() => onClose(false)} className="close-btn"><Icon name="cross" w="10" h="10" color="#90919A" stroke="100" /></div>
               </div>

               <div className="title">
                  <div className="checkbox"><Icon name="circle" w="25" h="25" color="#90919A" stroke="2" /></div>
                  <div>Finish the essay collaboration</div>
               </div>

               <div className="setting-section">
                  <div className="due-date">
                     <div>Due date</div>
                     <div>May 21 2022</div>
                  </div>
               </div>

               <div className="note-section">
                  Write a note...
               </div>

               <div className="st-section">
                  {Array.from(Array(4).keys()).map((index) =>
                  <div className="st-container">
                     <div className="checkbox"><Icon name="circle" w="25" h="25" color="#90919A" stroke="2" /></div>
                     <div>Buy a tickets</div>
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
                  <div>Delete task</div>
               </div>
            </div>

         </div>
      </div>
   )
}

export default TaskModal;
