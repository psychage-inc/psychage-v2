import { useAuth } from '../context/AuthContext';
import { patientSidebarItems, providerSidebarItems, adminSidebarItems } from '../config/sidebars';

export function useNavigation() {
    const { user, isAuthenticated } = useAuth();

    const getDashboardConfig = () => {
        if (!isAuthenticated) return null;

        switch (user?.role) {
            case 'admin':
                return {
                    path: '/admin',
                    label: 'Admin Dashboard',
                    sidebar: adminSidebarItems
                };
            case 'provider':
                return {
                    path: '/provider',
                    label: 'Provider Dashboard',
                    sidebar: providerSidebarItems
                };
            case 'patient':
            default:
                return {
                    path: '/dashboard',
                    label: 'My Dashboard',
                    sidebar: patientSidebarItems
                };
        }
    };

    return { getDashboardConfig };
}
