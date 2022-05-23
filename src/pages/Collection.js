import { useNavigate } from 'react-router-dom';

import Icon from '../components/Icon';
import { newCollection } from '../Core';

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
