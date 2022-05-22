import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Collection from './pages/Collection';
import CollectionOf from './pages/CollectionOf';
import Dashboard from './pages/Dashboard';

function Test() {
   return (
      <div>hello world</div>
   )
}

function App() {
   const [lists, setLists] = useState([
      {
         id: '0cd8c913-1846-4a33-a3a5-2d75f1e8b73d',
         name: 'School',
         icon: '🦁',
         color: "#c88323",
         tasks: [],
      },
      {
         id: '38934e74-a7f5-4c26-9fa6-bf2dfadcb840',
         name: 'Personal',
         icon: '🦙',
         color: "#d9cbaa",
         tasks: [],
      },
      {
         id: '0daa3427-c8de-42fa-bcc9-ead75dd50eb5',
         name: '',
         icon: '‼️',
         color: "#e61601",
         tasks: [],
      },
   ]);

   return (
      <div className="App">

         <div className="top-fixed">
            <Navbar />
         </div>

         <Routes>
            <Route path="/" element={<Dashboard lists={lists} />} />
            <Route path="/collection" element={<Collection lists={lists} setLists={setLists} />} />
            <Route path="/collection/:id" element={<CollectionOf lists={lists} setLists={setLists} />} />
         </Routes>

      </div>
   );
}

export default App;
