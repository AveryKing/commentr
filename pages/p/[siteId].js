import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import {Box, FormControl, FormLabel, Input, Button} from '@chakra-ui/react'
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import {useAuth} from '@/lib/auth';
import {createFeedback} from '@/lib/db';
import Feedback from "@/components/Feedback";

export async function getStaticProps(context) {
    const siteId = context.params.siteId
    const { feedback } = await getAllFeedback(siteId)

    return {
        props: {
            initialFeedback: feedback,
        },
        revalidate: 1,
    }
}

export async function getStaticPaths() {
    const { sites } = await getAllSites()
    const paths = sites.map((site) => ({
        params: {
            siteId: site.id.toString(),
        },
    }))

    return {
        paths,
        fallback: true,
    }
}

export default function FeedbackPage({initialFeedback}) {
    const router = useRouter();
    const auth = useAuth();
    const inputElement = useRef(null);
    const [allFeedback, setAllFeedback] = useState([]);

    useEffect(() => {
        setAllFeedback(initialFeedback);
    }, [initialFeedback])

    const onSubmit = (e) => {
        e.preventDefault();

        const newFeedback = {
            author: auth.user.name,
            authorId: auth.user.uid,
            siteId: router.query.siteId,
            text: inputElement.current.value,
            createdAt: new Date().toISOString(),
            provider: auth.user.provider,
            status: 'pending'
        }

        inputElement.current.value = '';
        setAllFeedback((currentFeedback) => [newFeedback, ...currentFeedback]);
        createFeedback(newFeedback)
            .then(r => null);
    }
    return (
        <Box
            display='flex'
            flexDirection='column'
            width='full'
            maxWidth='700px'
            margin='0 auto'
            >
            {auth.user && (
                <Box as='form' onSubmit={onSubmit}>
                    <FormControl my={8}>
                        <FormLabel htmlFor='comment'>Comment</FormLabel>
                        <Input ref={inputElement} id='comment' placeholder='Leave a comment'/>
                        <Button mt={4} type='submit' fontWeight='medium'>
                            Add Comment
                        </Button>
                    </FormControl>
                </Box>
            )}
            {initialFeedback && initialFeedback.map((feedback) => (
                <Feedback key={feedback.id} {...feedback} />
            ))}
        </Box>
    )
}