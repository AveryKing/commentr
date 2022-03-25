import {getAllSites} from '@/lib/db-admin';

export default async (_, res) => {
    const result = await getAllSites();
    result.error
        ? res.status(500).json({error: result.error})
        : res.status(200).json({sites: result.sites});
}