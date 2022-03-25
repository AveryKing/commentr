import React from 'react';
import useSWR from 'swr';
import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import SiteTable from "@/components/SiteTable";
import SiteTableSkeleton from "@/components/SideTableSkeleton";
import fetcher from "@/utils/fetcher";

import React from 'react';

const Dashboard = () => {
    const {data} = useSWR('/api/sites', fetcher);
    const sites = data?.sites;

    if (!data) {
        return (
            <DashboardShell>
                <SiteTableSkeleton/>
            </DashboardShell>
        )
    } else {
        return (
            <DashboardShell>
                {sites.length ? <SiteTable sites={sites} /> : <EmptyState/>}
            </DashboardShell>
        )
    }
};

export default Dashboard;