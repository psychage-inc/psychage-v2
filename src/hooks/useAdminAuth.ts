import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { mainUrl, isAdminDomain } from '@/lib/urls';
import type { AdminRole, AdminUser } from '@/lib/admin/types';

export function useAdminAuth(requiredRoles?: AdminRole[]) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const onAdminDomain = isAdminDomain();

  useEffect(() => {
    let cancelled = false;

    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // No session → login page (works on both domains since both have /login)
        if (!cancelled) navigate('/login', { replace: true });
        return;
      }

      const { data: roleData, error } = await supabase
        .from('admin_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (cancelled) return;

      if (error || !roleData) {
        // Not an admin → send to main site home
        if (!cancelled) {
          if (onAdminDomain) {
            window.location.href = mainUrl('/');
          } else {
            navigate('/', { replace: true });
          }
        }
        return;
      }

      const role = roleData.role as AdminRole;

      if (requiredRoles && !requiredRoles.includes(role)) {
        // Wrong admin sub-role → admin dashboard
        if (!cancelled) {
          navigate(onAdminDomain ? '/dashboard' : '/admin', { replace: true });
        }
        return;
      }

      setAdminUser({
        id: session.user.id,
        email: session.user.email || '',
        role,
      });
      setLoading(false);
    }

    checkAdmin();

    return () => { cancelled = true; };
  }, [navigate, requiredRoles, onAdminDomain]);

  return { adminUser, loading };
}
