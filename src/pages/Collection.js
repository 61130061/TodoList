import { useNavigate } from 'react-router-dom';

import Icon from '../components/Icon';
import { newCollection, hex2rgb } from '../Core';

function Collection ({ lists, setLists }) {
   const navigate = useNavigate();

   const handleNewCollection = () => {
      const newArr = [...lists];
      const collection = newCollection();
      newArr.push(collection);
      setLists(newArr);
      navigate('/collection/'+collection.id);
   }

   return (
      <div className="container">

         <div className="page-header">
            <div>Collection</div>
            <div className="dot-btn">
               <Icon name="dots" w="30" h="30" color="#fff" stroke="1" />
            </div>
         </div>

         <div className="clt-tab">
            <div>Reminder</div>
            <div active="true">Todo List</div>
         </div>

         <div className="clt-container">
            {lists.map((data, index) => 
            <div onClick={() => navigate(data.id)} key={index} className="clt-card">
               <div className="icon">
                  <div>{data.icon}</div>
               </div>
               <div untitled={data.name == '' ? 'true':'false'} className="title">{data.name}</div>
               <div className="footer">
                  <div>
                     {data.tasks.filter(el => el.done == true).length == data.tasks.length ?
                           data.tasks.length > 0 ? 'All done' : 'No task'
                           :data.tasks.filter(el => el.done == true).length+'/'+data.tasks.length + ' done'
                     }
                  </div>
                  {data.tasks.filter(el => el.done == true).length == data.tasks.length && data.tasks.length > 0 ?
                     <div 
                        className="check-ring" 
                        style={{
                           boxShadow: '0px 0px 5px 2px #000000, 0px 0px 0px 5px rgb(' + hex2rgb(data.color).r + ', ' + hex2rgb(data.color).g + ', ' + hex2rgb(data.color).b + ', 0.4)', 
                           backgroundColor: data.color
                        }}
                     >
                        <svg id="svg" width="10px" heigth="10px" viewBox="0 0 405.272 405.272">
                           <path d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836 c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064 c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z" fill="#fff"/>
                        </svg>
                     </div>:
                     <svg id="svg" width="30px" heigth="30px" viewBox="0 0 100 100">
                        <path fill="none" strokeLinecap="round" strokeWidth="15" stroke="rgb(255,255,255,0.2)"
                           strokeDasharray="250.2,250.2"
                           d="M50 10
                           a 40 40 0 0 1 0 80
                           a 40 40 0 0 1 0 -80"/>
                        {data.tasks.length > 0 &&
                        <path fill="none" strokeLinecap="round" strokeWidth="15" stroke={data.color}
                           strokeDasharray={String((data.tasks.filter(el => el.done == true).length / data.tasks.length)*250.2)+',250.2'}
                           d="M50 10
                           a 40 40 0 0 1 0 80
                           a 40 40 0 0 1 0 -80"/>
                        }
                     </svg>
                  }
               </div>
            </div>
            )}
            <div onClick={handleNewCollection} className="clt-add-card">
               <Icon name="plus" w="20" h="20" color="#414052" stroke="2" />
            </div>
         </div>



      </div>
   )
}

export default Collection;
