import Icon from './Icon';
import { updateCollection, getEmojiColor } from '../Core';

function ColorModal ({ onClose, lists, setLists, listIndex  }) {
   const handleTyping = (e) => {
      if (e.target.value.length <= 6) {
         updateCollection(lists, setLists, listIndex, 'color', '#'+e.target.value);
      }
   }

   return (
      <div className="modal-screen">
         <div className="modal-container color-modal">

            <div className="main">
               <div className="navbar">
                  <div onClick={onClose} className="close-btn"><Icon name="cross" w="10" h="10" color="#90919A" stroke="100" /></div>
               </div>
               <div className="title">
                  <div>Edit Color</div>
               </div>
               <div className="color-input">
                  <div className="prev-color" style={{backgroundColor: lists[listIndex].color}} />
                  <div className="input-container">
                     <div>#</div>
                     <input autoFocus value={lists[listIndex].color.split('#')[1]} onChange={handleTyping} placeholder={getEmojiColor(lists[listIndex].icon).split('#')[1]} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ColorModal;
