import { Link, useNavigate, useLocation } from 'react-router-dom';

import Icon from './Icon';

function Navbar () {
   const navigate = useNavigate();
   const location = useLocation();

   const checkLocation = (name) => {
      const path = location.pathname.split('/')[1];
      return String(path == name);
   }

   return (
      <div className="Navbar">
         <div>
            <div className="nav-logo">Logo</div>
            <div className="nav-menu">
               <div onClick={() => navigate('/dashboard', { replace: true })} active={checkLocation('dashboard')}>Dashboard</div>
               <div onClick={() => navigate('/collection', { replace: true })} active={checkLocation('collection')}>Collections</div>
            </div>
         </div>

         <div>
            <div><Icon name="search" w="15" h="15" color="#fff" stroke="10" /></div>
            <div><Icon name="bell" w="20" h="20" color="#fff" stroke="2" /></div>
            <div>Profile</div>
         </div>
      </div>
   )
}

export default Navbar;
