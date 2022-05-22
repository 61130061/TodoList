import { useNavigate } from 'react-router-dom';

import Icon from '../components/Icon';

function Dashboard ({ lists }) {
   const navigate = useNavigate();

   const handleGroup = (e) => {
      const body = e.target.parentElement.childNodes[1];
      const icon = e.target.childNodes[1];
      if (body.style.display === "none") {
         icon.style.transform = "rotate(180deg)";
         body.style.display = "flex";
         e.target.style.borderRadius = "15px 15px 0px 0px";
      } else {
         icon.style.transform = "rotate(0deg)";
         body.style.display = "none";
         e.target.style.borderRadius = "15px";
      }
   }

   return (
      <div className="container">

         <div className="page-header">
            <div>Dashboard</div>
            <div className="dot-btn"><Icon name="dots" w="30" h="30" color="#fff" stroke="1" /></div>
         </div>

         <div className="clt-tab">
            <div active="true">Daily Overview</div>
            <div>Overall</div>
         </div>

         <div className="db-today">
            {lists.map((data, index) =>
            <div key={index} className="db-group">
               <div onClick={handleGroup} className="header">
                  <div>
                     <div>{data.icon}</div>
                     <div untitled={data.name == '' ? 'true':'false'}>{data.name}</div>
                  </div>
                  <div className="icon"><Icon name="down" w="20" h="20" color="#fff" stroke="4" /></div>
               </div>
               <div className="body">
                  {Array.from(Array(2).keys()).map((index) =>
                  <div key={index} className="task-container">
                     <div className="checkbox"><Icon name="circle" w="25" h="25" color={data.color} stroke="2" /></div>
                     <div className="detail">
                        <div>Prepare dribbble shot</div>
                        <div>Today 12:00</div>
                     </div>
                  </div>
                  )}
                  <div onClick={() => navigate('/collection/'+data.id) } className="footer">
                     Go to Collection
                     <Icon className="arrow-icon" name="arrow" w="15" h="15" color="#fff" stroke="30" />
                  </div>
               </div>
            </div>
            )}
         </div>

      </div>
   )
}

export default Dashboard;
