/**
 * Navigation System Type Definitions
 *
 * Comprehensive type system for permission-aware navigation configuration.
 * Supports role-based access, feature flags, and conditional visibility.
 */

export type UserRole = 'patient' | 'provider' | 'admin' | 'public';
export type NavItemType = 'link' | 'mega-menu' | 'divider' | 'external';

/**
 * Base properties shared by all navigation items
 */
export interface BaseNavItem {
  id: string;
  label: string;
  type: NavItemType;

  // Permission system
  allowedRoles?: UserRole[];
  requiredAuth?: boolean;
  requiredFeatureFlag?: string;
  hideWhenAuthenticated?: boolean;
  showOnlyWhenAuthenticated?: boolean;

  // Display
  icon?: string;
  description?: string;
  className?: string;
}

/**
 * Standard navigation link
 */
export interface NavLink extends BaseNavItem {
  type: 'link';
  href: string;
  external?: boolean;
}

/**
 * Mega menu with sections and quick actions
 */
export interface NavMegaMenu extends BaseNavItem {
  type: 'mega-menu';
  sections: NavSection[];
  quickActions?: QuickAction[];
}

/**
 * Section within a mega menu
 */
export interface NavSection {
  title: string;
  items: NavSectionItem[];
}

/**
 * Item within a mega menu section
 */
export interface NavSectionItem {
  id: string;
  label: string;
  description?: string;
  href: string;
  icon?: string;
  cta?: string;

  // Permission fields
  allowedRoles?: UserRole[];
  requiredAuth?: boolean;
  requiredFeatureFlag?: string;
}

/**
 * Quick action in mega menu sidebar
 */
export interface QuickAction {
  label: string;
  href: string;
  allowedRoles?: UserRole[];
  requiredAuth?: boolean;
  requiredFeatureFlag?: string;
}

/**
 * Visual divider
 */
export interface NavDivider extends BaseNavItem {
  type: 'divider';
}

/**
 * External link (opens in new tab)
 */
export interface NavExternal extends BaseNavItem {
  type: 'external';
  href: string;
}

/**
 * Union type of all navigation items
 */
export type NavItem = NavLink | NavMegaMenu | NavDivider | NavExternal;

/**
 * Top-level navigation configuration structure
 */
export interface NavigationConfig {
  primary: NavItem[];
  secondary: NavItem[];
  dashboard: NavItem[];
  auth: NavItem[];
}
