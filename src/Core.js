import { v1 as uuid } from 'uuid';
import { useEffect } from 'react';

import emojiList from './data/emoji-list-data';
import emojiGroup from './data/emoji-group-data';

function randomEmoji () {
   return emojiList[~~(Math.random() * emojiList.length)]
}

function getAvgHex (color, total) {
   return Math.round(color / total).toString(16).padStart(2, 0);
}

function getEmojiColor (emoji) {
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
