import React from 'react';
import { useMediaQuery, MOBILE_NARROW_QUERY } from '@/hooks/useMediaQuery';

/**
 * Renders the `mobile` element at the phone breakpoint (≤639px), the `desktop`
 * element otherwise. Only the matched branch mounts, so only its lazy chunk
 * loads. The desktop branch is the same element the route rendered before —
 * desktop stays frozen.
 */
interface ResponsiveRouteProps {
    mobile: React.ReactNode;
    desktop: React.ReactNode;
}

const ResponsiveRoute: React.FC<ResponsiveRouteProps> = ({ mobile, desktop }) => {
    const isPhone = useMediaQuery(MOBILE_NARROW_QUERY);
    return <>{isPhone ? mobile : desktop}</>;
};

export default ResponsiveRoute;
