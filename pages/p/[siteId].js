import {useRouter} from 'next/router';
import Box from '@chakra-ui/react';

export default function FeedbackPage() {
    const router = useRouter();

    return <Box>{router.query.siteId}</Box>
}