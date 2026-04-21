import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Eye,
  Search,
  MousePointerClick,
  Bookmark,
  ArrowRight,
  ExternalLink,
  Lock,
  TrendingUp,
} from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useMyProvider, useDashboardStats, useTrustScore } from '@/hooks/useProviderPortal';
import { calculateProfileCompleteness } from '@/services/provider-portal';
import { hasAccess, getTierLabel, getTierBadgeVariant } from '@/lib/provider-tier';
import type { ProviderTier } from '@/lib/provider-tier';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { cn } from '@/lib/utils';

// =============================================================================
// Dashboard Metric Card
// =============================================================================

interface MetricCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  locked?: boolean;
  trend?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, locked, trend }) => (
  <div className={cn(
    'bg-surface rounded-2xl p-5 border border-border transition-all',
    locked && 'opacity-60'
  )}>
    <div className="flex items-center justify-between mb-3">
      <span className="text-text-tertiary">{icon}</span>
      {locked ? (
        <Lock size={14} className="text-text-tertiary" />
      ) : trend ? (
        <span className="text-xs font-medium text-teal-700 dark:text-teal-400 flex items-center gap-1">
          <TrendingUp size={12} />{trend}
        </span>
      ) : null}
    </div>
    <p className="font-display font-bold text-2xl text-text-primary">
      {locked ? '—' : value}
    </p>
    <p className="text-sm text-text-tertiary mt-0.5">{label}</p>
  </div>
);

// =============================================================================
// Profile Completeness Ring
// =============================================================================

interface CompletenessRingProps {
  percentage: number;
}

const CompletenessRing: React.FC<CompletenessRingProps> = ({ percentage }) => {
  const data = [{ value: percentage, fill: '#1A9B8C' }];

  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-20">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%" cy="50%"
            innerRadius="70%" outerRadius="100%"
            barSize={8}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={4}
              background={{ fill: 'var(--color-border)' }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="font-display font-bold text-xl text-text-primary">{percentage}%</p>
        <p className="text-sm text-text-tertiary">Profile Complete</p>
      </div>
    </div>
  );
};

// =============================================================================
// Portal Dashboard Page
// =============================================================================

const PortalDashboard: React.FC = () => {
  const { data: provider, isLoading } = useMyProvider();
  const { data: stats } = useDashboardStats(provider?.id);
  const { data: trustScore } = useTrustScore(provider?.id);

  const tier = (provider?.tier as ProviderTier) || 'free';
  const completeness = provider ? calculateProfileCompleteness(provider) : 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-surface rounded-2xl h-32 animate-pulse border border-border" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-surface rounded-2xl h-28 animate-pulse border border-border" />
          ))}
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="bg-surface rounded-2xl p-8 border border-border text-center">
        <h2 className="font-display font-bold text-xl text-text-primary mb-2">No Provider Profile Found</h2>
        <p className="text-text-secondary mb-4">You need to claim or create a provider profile first.</p>
        <Link to="/for-providers/claim">
          <Button>Claim Your Profile</Button>
        </Link>
      </div>
    );
  }

  const firstName = provider.display_name.split(' ')[0];

  return (
    <>
      <SEO title="Provider Dashboard | Psychage" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Welcome Banner */}
        <motion.div
          variants={staggerItem}
          className="bg-surface rounded-2xl p-6 border border-border"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-2xl text-text-primary">
                Welcome back, {firstName}
              </h1>
              <p className="text-text-secondary mt-1">
                Manage your profile, track engagement, and grow your practice.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={getTierBadgeVariant(tier)}>{getTierLabel(tier)} Plan</Badge>
              <Link to={`/providers/${provider.id}`} className="text-sm text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1">
                View public profile <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Completeness + Trust Score Row */}
        <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Profile Completeness */}
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <CompletenessRing percentage={completeness} />
            {completeness < 100 && (
              <Link
                to="/portal/profile"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 dark:text-teal-400 hover:underline"
              >
                Complete your profile <ArrowRight size={14} />
              </Link>
            )}
          </div>

          {/* Trust Score */}
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={18} className="text-teal-500" />
              <h3 className="font-display font-semibold text-text-primary">Trust Score</h3>
            </div>
            {trustScore && trustScore.overall_score > 0 ? (
              <p className="font-display font-bold text-3xl text-text-primary">
                {Math.round(trustScore.overall_score)}
                <span className="text-base font-normal text-text-tertiary">/100</span>
              </p>
            ) : (
              <div>
                <p className="text-text-secondary text-sm">Building your trust score</p>
                <p className="text-xs text-text-tertiary mt-1">
                  Complete your profile and earn reviews to build your score.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Metric Cards */}
        <motion.div variants={staggerItem} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Profile Views"
            value={stats?.profileViews ?? 0}
            icon={<Eye size={18} />}
          />
          <MetricCard
            label="Search Impressions"
            value={stats?.searchImpressions ?? 0}
            icon={<Search size={18} />}
            locked={!hasAccess(tier, 'pro')}
          />
          <MetricCard
            label="Contact Clicks"
            value={stats?.contactClicks ?? 0}
            icon={<MousePointerClick size={18} />}
            locked={!hasAccess(tier, 'pro')}
          />
          <MetricCard
            label="Favorites"
            value={stats?.favorites ?? 0}
            icon={<Bookmark size={18} />}
            locked={!hasAccess(tier, 'pro')}
          />
        </motion.div>

        {/* Upgrade prompt for free tier */}
        {tier === 'free' && (
          <motion.div variants={staggerItem}>
            <div className="bg-teal-50 dark:bg-teal-900/10 rounded-2xl p-6 border border-teal-200 dark:border-teal-800/40">
              <h3 className="font-display font-bold text-lg text-text-primary mb-1">
                Unlock Full Analytics
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Upgrade to Pro to see search impressions, contact clicks, reviews, and more.
                Start with a free 30-day trial.
              </p>
              <Link to="/portal/subscription">
                <Button size="sm">
                  Upgrade to Pro <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div variants={staggerItem}>
          <h2 className="font-display font-semibold text-lg text-text-primary mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/portal/profile"
              className="bg-surface rounded-xl p-4 border border-border hover:border-teal-300 dark:hover:border-teal-700 transition-colors group"
            >
              <p className="font-medium text-text-primary group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                Update Profile
              </p>
              <p className="text-sm text-text-tertiary mt-0.5">Edit bio, photos, specialties</p>
            </Link>
            <Link
              to="/portal/subscription"
              className="bg-surface rounded-xl p-4 border border-border hover:border-teal-300 dark:hover:border-teal-700 transition-colors group"
            >
              <p className="font-medium text-text-primary group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                Manage Subscription
              </p>
              <p className="text-sm text-text-tertiary mt-0.5">Upgrade plan, billing</p>
            </Link>
            <Link
              to="/portal/verification"
              className="bg-surface rounded-xl p-4 border border-border hover:border-teal-300 dark:hover:border-teal-700 transition-colors group"
            >
              <p className="font-medium text-text-primary group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                Verification
              </p>
              <p className="text-sm text-text-tertiary mt-0.5">NPI, license, certification</p>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default PortalDashboard;
