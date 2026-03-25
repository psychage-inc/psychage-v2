 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminStatCard from '../AdminStatCard';
import { Users } from 'lucide-react';

describe('AdminStatCard', () => {
    it('should render label', () => {
        render(<AdminStatCard label="Total Users" value={150} icon={Users} color="text-blue-500" />);
        expect(screen.getByText('Total Users')).toBeInTheDocument();
    });

    it('should render numeric value', () => {
        render(<AdminStatCard label="Users" value={150} icon={Users} color="text-blue-500" />);
        expect(screen.getByText('150')).toBeInTheDocument();
    });

    it('should render string value', () => {
        render(<AdminStatCard label="Status" value="Active" icon={Users} color="text-blue-500" />);
        expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should show loading skeleton when isLoading', () => {
        const { container } = render(
            <AdminStatCard label="Users" value={0} icon={Users} color="text-blue-500" isLoading />
        );
        expect(container.querySelector('.animate-pulse')).not.toBeNull();
    });

    it('should show positive trend with + prefix', () => {
        render(<AdminStatCard label="Users" value={100} icon={Users} color="text-blue-500" trend={12} />);
        expect(screen.getByText('+12')).toBeInTheDocument();
    });

    it('should show negative trend', () => {
        render(<AdminStatCard label="Users" value={100} icon={Users} color="text-blue-500" trend={-5} />);
        expect(screen.getByText('-5')).toBeInTheDocument();
    });

    it('should display trend label', () => {
        render(<AdminStatCard label="Users" value={100} icon={Users} color="text-blue-500" trend={8} trendLabel="this week" />);
        expect(screen.getByText('this week')).toBeInTheDocument();
    });

    it('should not show trend when loading', () => {
        render(<AdminStatCard label="Users" value={100} icon={Users} color="text-blue-500" trend={5} isLoading />);
        expect(screen.queryByText('+5')).not.toBeInTheDocument();
    });
});
