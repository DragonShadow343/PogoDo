import { Routes, Route } from 'react-router-dom';
import RequireAuth from '../RequireAuth';
import Home from '../pages/adminPages/Home';
import Missing from '../pages/Missing';
import TaskBoard from '../pages/adminPages/TaskBoard';
import TeamMembers from '../pages/adminPages/TeamMember';
import Settings from '../pages/adminPages/Settings';

const AdminRoutes = () => {
    return (
        <RequireAuth allowedRoles={['admin']}>
            <Routes>
                <Route path="/admin/" element={<Home />} />
                <Route path="/admin/home" element={<Home />} />
                <Route path="/admin/tasks" element={<TaskBoard />} />
                <Route path="/admin/team-members" element={<TeamMembers />} />
                <Route path="/admin/settings" element={<Settings />} />
                {/* Add more admin-specific routes here */}
                <Route path="*" element={<Missing />} />
            </Routes>
        </RequireAuth>
    );
};

export default AdminRoutes;
