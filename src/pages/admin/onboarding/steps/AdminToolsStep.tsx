import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  FileText,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import type { StepProps } from './types';

const ADMIN_TOOLS = [
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    description:
      'System overview with user counts, pending actions, active sessions, and recent activity feed.',
    path: '/admin',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    icon: Users,
    title: 'Provider Management',
    description:
      'Review provider applications, verify credentials, approve or suspend providers. Each action is logged.',
    path: '/admin/providers',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: UserCircle,
    title: 'User Management',
    description:
      'View all users, filter by role, manage account status, and invite new administrators.',
    path: '/admin/users',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: FileText,
    title: 'Reports',
    description:
      'Content reports, user reports, and system reports. Investigate, resolve, and document findings.',
    path: '/admin/reports',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: ShieldAlert,
    title: 'Audit Logs',
    description:
      'Complete trail of all admin actions for accountability. Filter by action type, user, and date.',
    path: '/admin/audit',
    color: 'from-rose-500 to-red-600',
  },
] as const;

const AdminToolsStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
          Your Admin Toolkit
        </h2>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          Here&apos;s what you&apos;ll find in the admin panel sidebar.
        </p>
      </motion.div>

      <div className="space-y-3 mb-10">
        {ADMIN_TOOLS.map((tool, index) => (
          <motion.div
            key={tool.title}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center flex-shrink-0 shadow-sm`}
            >
              <tool.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-text-primary">{tool.title}</h3>
                <span className="text-xs text-text-tertiary font-mono">
                  {tool.path}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {tool.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          rightIcon={<ArrowRight className="w-5 h-5" />}
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AdminToolsStep;
