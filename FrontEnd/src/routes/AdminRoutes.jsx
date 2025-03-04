import { Routes, Route } from 'react-router-dom';
import RequireAuth from '../RequireAuth';
import Home from '../pages/adminPages/Home';
import Missing from '../pages/Missing';

const AdminRoutes = () => {
    return (
        // <RequireAuth allowedRoles={['admin']}>
            <Routes>
                <Route path="/admin/" element={<Home />} />
                <Route path="/admin/home" element={<Home />} />
                {/* Add more admin-specific routes here */}
                <Route path="*" element={<Missing />} />
            </Routes>
        // </RequireAuth>
    );
};

export default AdminRoutes;
