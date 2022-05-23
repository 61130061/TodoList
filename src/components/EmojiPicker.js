import { useRef } from 'react';
import { useClickOutside, randomEmoji } from '../Core';

import emojiGroup from '../data/emoji-group-data';

function EmojiPicker ({ onClose, onSelect }) {
   const epRef = useRef(null);

   useClickOutside(epRef, onClose);

   return(
      <div ref={epRef} className="EmojiPicker">
         <div className="top">
            <input placeholder="filter..." />
            <div onClick={() => onSelect(randomEmoji())}>random</div>
         </div>
         <div className="ep-body">
            {Object.keys(emojiGroup).map((key) => 
            <div key={key} className="ep-group">
               <div className="title">{key}</div>
               <div className="emoji-container">
                  {emojiGroup[key].map((data, index) =>
                  <div onClick={(e) => onSelect(e.target.innerText)} key={index}>{data.emoji}</div>
                  )}
               </div>
            </div>
            )}
         </div>
      </div>
   )
}

export default EmojiPicker;
