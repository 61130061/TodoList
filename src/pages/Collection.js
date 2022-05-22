import { useNavigate } from 'react-router-dom';

import Icon from '../components/Icon';

function countDoneTask (data) {
   let count = 0;
   for (let i=0; i<data.length; i++) {
      if (data[i].done) {
         count++;
      }
   }
   return count;
}

function Collection ({ lists }) {
   const navigate = useNavigate();

   return (
      <div className="container">

         <div className="page-header">
            <div>Collection</div>
            <div className="dot-btn"><Icon name="dots" w="30" h="30" color="#fff" stroke="1" /></div>
         </div>

         <div className="clt-tab">
            <div>Reminder</div>
            <div active="true">Todo List</div>
         </div>

         <div className="clt-container">
            {lists.map((data, index) => 
            <div onClick={() => navigate(data.id)} key={index} className="clt-card">
               <div className="icon">{data.icon}</div>
               <div untitled={data.name == '' ? 'true':'false'} className="title">{data.name}</div>
               <div className="footer">
                  <div>
                     {countDoneTask(data) == data.tasks.length ?
                           data.tasks.length > 0 ? 'All done' : 'No task'
                           :countDoneTask(data)+'/'+data.tasks.length + ' done'
                     }
                  </div>
                  <svg id="svg" width="30px" heigth="30px" viewBox="0 0 100 100">
                     <path fill="none" strokeLinecap="round" strokeWidth="15" stroke="rgb(255,255,255,0.2)"
                        strokeDasharray="250.2,250.2"
                        d="M50 10
                        a 40 40 0 0 1 0 80
                        a 40 40 0 0 1 0 -80"/>
                     <path fill="none" strokeLinecap="round" strokeWidth="15" stroke="#fff"
                        strokeDasharray="125.1,250.2"
                        d="M50 10
                        a 40 40 0 0 1 0 80
                        a 40 40 0 0 1 0 -80"/>
                  </svg>
               </div>
            </div>
            )}
            <div className="clt-add-card">
               <Icon name="plus" w="20" h="20" color="#414052" stroke="2" />
            </div>
         </div>



      </div>
   )
}

export default Collection;
