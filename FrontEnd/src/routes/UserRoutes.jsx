import { Routes, Route } from 'react-router-dom';
import RequireAuth from '../RequireAuth';
import Home from '../pages/userPages/Home';

import Missing from '../pages/Missing';

const UserRoutes = () => {
    return (
        <RequireAuth allowedRoles={['user']}>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="*" element={<Missing />} />
            </Routes>
        </RequireAuth>
    );
};

export default UserRoutes;
