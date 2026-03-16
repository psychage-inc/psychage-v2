/**
 * Create a demo admin user for the Psychage admin panel.
 *
 * Usage:  npx tsx scripts/create-demo-admin.ts
 *
 * Credentials created:
 *   Email:    demo@psychage.com
 *   Password: PsychageAdmin2026!
 *   Role:     super_admin
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(resolve(__dirname, '../.env'), 'utf-8');
const envVars: Record<string, string> = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  envVars[trimmed.slice(0, eqIdx)] = trimmed.slice(eqIdx + 1);
}

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const DEMO_EMAIL = 'demo@psychage.com';
const DEMO_PASSWORD = 'PsychageAdmin2026!';

async function main() {
  console.log('Creating demo admin user...\n');

  // 1. Create auth user with admin role in metadata
  const { data: userData, error: createError } =
    await supabase.auth.admin.createUser({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: { role: 'admin' },
    });

  if (createError) {
    // If user already exists, fetch them instead
    if (createError.message.includes('already been registered')) {
      console.log('User already exists — updating metadata and role...');

      const { data: listData } = await supabase.auth.admin.listUsers();
      const existing = listData?.users?.find((u) => u.email === DEMO_EMAIL);

      if (!existing) {
        console.error('Could not find existing user');
        process.exit(1);
      }

      // Ensure metadata is correct
      await supabase.auth.admin.updateUserById(existing.id, {
        user_metadata: { role: 'admin' },
        password: DEMO_PASSWORD,
      });

      // Upsert admin_roles
      const { error: roleError } = await supabase
        .from('admin_roles')
        .upsert(
          { user_id: existing.id, role: 'super_admin' },
          { onConflict: 'user_id' }
        );

      if (roleError) {
        console.error('Failed to set admin role:', roleError.message);
        process.exit(1);
      }

      console.log('\nDemo admin credentials ready:');
      console.log('  Email:    ', DEMO_EMAIL);
      console.log('  Password: ', DEMO_PASSWORD);
      console.log('  Role:      super_admin');
      console.log('  User ID:  ', existing.id);
      return;
    }

    console.error('Failed to create user:', createError.message);
    process.exit(1);
  }

  const userId = userData.user.id;
  console.log('Auth user created:', userId);

  // 2. Insert into admin_roles
  const { error: roleError } = await supabase
    .from('admin_roles')
    .insert({ user_id: userId, role: 'super_admin' });

  if (roleError) {
    console.error('Failed to set admin role:', roleError.message);
    process.exit(1);
  }

  console.log('Admin role assigned: super_admin');

  console.log('\n========================================');
  console.log('  Demo Admin Credentials');
  console.log('========================================');
  console.log('  Email:    ', DEMO_EMAIL);
  console.log('  Password: ', DEMO_PASSWORD);
  console.log('  Role:      super_admin');
  console.log('  User ID:  ', userId);
  console.log('========================================\n');
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
