import { v1 as uuid } from 'uuid';
import { useEffect } from 'react';

import emojiList from './data/emoji-list-data';
import emojiGroup from './data/emoji-group-data';

export function randomEmoji () {
   return emojiList[~~(Math.random() * emojiList.length)]
}

function getAvgHex (color, total) {
   return Math.round(color / total).toString(16).padStart(2, 0);
}

export function getEmojiColor (emoji) {
   let totalPixels = 0;
   const colors = {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0
   };
   const canvas = document.createElement("canvas");
   const ctx = canvas.getContext("2d");
   ctx.font = "30px Arial";
   ctx.fillText(emoji, 0, 28);
   const { data: imageData } = ctx.getImageData(0, 0, 30, 30);
   for (let i = 0; i < imageData.length; i += 4) {
      let [r, g, b, a] = imageData.slice(i, i + 4);
      if (a > 50) {
         totalPixels += 1;
         colors.red += r;
         colors.green += g;
         colors.blue += b;
         colors.alpha += a;
      }
   }
   const r = getAvgHex(colors.red, totalPixels);
   const g = getAvgHex(colors.green, totalPixels);
   const b = getAvgHex(colors.blue, totalPixels);

   return "#" + r + g + b;
}

export function newCollection (emoji = randomEmoji()) {
   return {
      id: uuid(),
      name: '',
      icon: emoji,
      color: getEmojiColor(emoji),
      tasks: [],
   }
}

export function useClickOutside (ref, callback) {
   useEffect(() => {
      function handleClickOutside(event) {
         if (ref.current && !ref.current.contains(event.target)) {
            callback();
         }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         // Unbind the event listener on clean up
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [ref])
}

export function deleteCollection (lists, setLists, index) {
   const newArr = [...lists];
   if (index > -1) {
      newArr.splice(index, 1);
   }
   setLists(newArr);
}

export function updateCollection (lists, setLists, index, key, value) {
   const newArr = [...lists];
   if (index > -1) {
      newArr[index][key] = value;
   }
   setLists(newArr);
}

export function createTask (lists, setLists, listIndex) {
   const newArr = [...lists];
   newArr[listIndex].tasks.push({
      id: uuid(),
      name: '',
      done: false,
      date: '',
      note: '',
      files: [],
      sub: [],
   });
   setLists(newArr);
}

export function updateTask (lists, setLists, listIndex, taskIndex, key, value) {
   const newArr = [...lists];
   if (taskIndex > -1) {
      newArr[listIndex].tasks[taskIndex][key] = value;
   }
   setLists(newArr);
}

export function deleteTask (lists, setLists, listIndex, index) {
   const newArr = [...lists];
   if (index > -1) {
      newArr[listIndex].tasks.splice(index, 1);
   }
   setLists(newArr);
}

export function createSubTask (lists, setLists, listIndex, taskIndex) {
   const newArr = [...lists];
   newArr[listIndex].tasks[taskIndex].sub.push({
      name: "",
      done: false,
   });
   setLists(newArr);
}

export function updateSubTask (lists, setLists, listIndex, taskIndex, subIndex, key, value) {
   const newArr = [...lists];
   if (subIndex > -1) {
      newArr[listIndex].tasks[taskIndex].sub[subIndex][key] = value;
   }
   setLists(newArr);
}

export function deleteSubTask (lists, setLists, listIndex, taskIndex, index) {
   const newArr = [...lists];
   if (index > -1) {
      newArr[listIndex].tasks[taskIndex].sub.splice(index, 1);
   }
   setLists(newArr);
}

export function hex2rgb (hex) {
   var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
   hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
   });

   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
   } : null;
}
