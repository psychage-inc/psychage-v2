import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import type { AdminRole, AdminUser } from '@/lib/admin/types';

export function useAdminAuth(requiredRoles?: AdminRole[]) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
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
        navigate('/', { replace: true });
        return;
      }

      const role = roleData.role as AdminRole;

      if (requiredRoles && !requiredRoles.includes(role)) {
        navigate('/admin', { replace: true });
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
  }, [navigate, requiredRoles]);

  return { adminUser, loading };
}
