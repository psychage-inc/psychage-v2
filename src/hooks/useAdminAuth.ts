import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import type { AdminRole, AdminUser } from '@/lib/admin/types';

const isDev = import.meta.env.DEV;

export function useAdminAuth(requiredRoles?: AdminRole[]) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function checkAdmin() {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          if (!cancelled) {
            setLoading(false);
            navigate('/login', { replace: true });
          }
          return;
        }

        const { data: roleData, error } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (cancelled) return;

        if (error || !roleData) {
          // Dev bypass: user_metadata says admin but no admin_roles row — grant viewer access
          if (isDev && session.user.user_metadata?.role === 'admin') {
            console.warn(
              '[useAdminAuth] No admin_roles row found, but user_metadata.role is "admin". ' +
              'Granting dev-mode viewer access. Run `npx tsx scripts/create-demo-admin.ts` for full access.',
            );
            setAdminUser({
              id: session.user.id,
              email: session.user.email || '',
              role: 'viewer',
            });
            setLoading(false);
            return;
          }

          // Not an admin — show denied state (AdminLayout will render appropriate UI)
          if (!cancelled) {
            setDenied(true);
            setLoading(false);
          }
          return;
        }

        const role = roleData.role as AdminRole;

        if (requiredRoles && !requiredRoles.includes(role)) {
          // Wrong admin sub-role — stay in admin app, go to dashboard
          if (!cancelled) {
            setLoading(false);
            navigate('/dashboard', { replace: true });
          }
          return;
        }

        setAdminUser({
          id: session.user.id,
          email: session.user.email || '',
          role,
        });
        setLoading(false);
      } catch (err) {
        console.error('[useAdminAuth] Error checking admin status:', err);
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    checkAdmin();

    return () => { cancelled = true; };
  }, [navigate, requiredRoles]);

  return { adminUser, loading, denied };
}
