import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import type { NavItem, NavSectionItem, QuickAction, UserRole } from '../types/navigation';

/**
 * Check if a feature flag is enabled
 * @param flagName - Environment variable name (e.g., 'VITE_ENABLE_MOOD_JOURNAL')
 * @returns true if enabled, false otherwise
 */
function isFeatureEnabled(flagName?: string): boolean {
    if (!flagName) return true;

    const value = import.meta.env[flagName];
    return value === 'true' || value === true;
}

/**
 * Check if user has required role
 * @param userRole - Current user's role (or undefined if not authenticated)
 * @param allowedRoles - Array of allowed roles
 * @returns true if user has permission, false otherwise
 */
function hasRequiredRole(userRole: UserRole | undefined, allowedRoles?: UserRole[]): boolean {
    // If no roles specified, allow all (including public)
    if (!allowedRoles || allowedRoles.length === 0) {
        return true;
    }

    // If user not authenticated, they're "public"
    const effectiveRole: UserRole = userRole || 'public';

    return allowedRoles.includes(effectiveRole);
}

/**
 * Hook for filtering navigation items based on permissions
 *
 * Provides utility functions to filter navigation items based on:
 * - Feature flags (VITE_ENABLE_* environment variables)
 * - Authentication state (logged in/out)
 * - User roles (patient/provider/admin/public)
 * - Visibility flags (hideWhenAuthenticated, showOnlyWhenAuthenticated)
 *
 * @example
 * ```tsx
 * const { filterNavItems, filterMegaMenu } = useNavPermissions();
 * const visibleItems = filterNavItems(navigationConfig.primary);
 * ```
 */
export function useNavPermissions() {
    const { user, isAuthenticated } = useAuth();
    const userRole = user?.role;

    /**
     * Check if a single navigation item is accessible to the current user
     */
    const canAccessItem = useMemo(() => {
        return (item: NavItem | NavSectionItem | QuickAction): boolean => {
            // Check feature flag
            const featureFlag = 'requiredFeatureFlag' in item ? item.requiredFeatureFlag : undefined;
            if (!isFeatureEnabled(featureFlag)) {
                return false;
            }

            // Check authentication requirement
            const requiresAuth = 'requiredAuth' in item ? item.requiredAuth : false;
            if (requiresAuth && !isAuthenticated) {
                return false;
            }

            // Check hide/show when authenticated flags
            if ('hideWhenAuthenticated' in item && item.hideWhenAuthenticated && isAuthenticated) {
                return false;
            }

            if ('showOnlyWhenAuthenticated' in item && item.showOnlyWhenAuthenticated && !isAuthenticated) {
                return false;
            }

            // Check role permissions
            const allowedRoles = 'allowedRoles' in item ? item.allowedRoles : undefined;
            if (!hasRequiredRole(userRole, allowedRoles)) {
                return false;
            }

            return true;
        };
    }, [isAuthenticated, userRole]);

    /**
     * Filter an array of navigation items
     */
    const filterNavItems = useMemo(() => {
        return <T extends NavItem | NavSectionItem | QuickAction>(items: T[]): T[] => {
            return items.filter(item => canAccessItem(item));
        };
    }, [canAccessItem]);

    /**
     * Filter a mega menu (including nested sections and quick actions)
     * @returns Filtered NavItem or null if entire menu should be hidden
     */
    const filterMegaMenu = useMemo(() => {
        return (menu: NavItem): NavItem | null => {
            // First check if the menu itself is accessible
            if (!canAccessItem(menu)) {
                return null;
            }

            // If it's a mega menu, filter sections and quick actions
            if (menu.type === 'mega-menu') {
                // Filter sections and their items
                const filteredSections = menu.sections
                    .map(section => ({
                        ...section,
                        items: filterNavItems(section.items)
                    }))
                    .filter(section => section.items.length > 0); // Remove empty sections

                // Filter quick actions
                const filteredQuickActions = menu.quickActions
                    ? filterNavItems(menu.quickActions)
                    : undefined;

                // If no sections remain after filtering, hide the entire menu
                if (filteredSections.length === 0) {
                    return null;
                }

                return {
                    ...menu,
                    sections: filteredSections,
                    quickActions: filteredQuickActions
                };
            }

            // For non-mega-menu items, return as-is if accessible
            return menu;
        };
    }, [canAccessItem, filterNavItems]);

    return {
        canAccessItem,
        filterNavItems,
        filterMegaMenu,
        isAuthenticated,
        userRole
    };
}
