import {useAuth} from '@/lib/auth';
import {Button} from "@chakra-ui/react";

export default function Index() {
    const auth = useAuth();

    return auth.user ? (
        <div>
            <p>Email: {auth.user.email}</p>
            <button onClick={(e) => auth.signOut()}>
                Sign Out
            </button>
        </div>
    ) : (
        <>
            <Button onClick={(e) => auth.signInWithGithub()}>
                Sign in With GitHub
            </Button>
            <Button onClick={(e) => auth.signInWithGoogle()}>
                Sign in With Google
            </Button>

        </>

    )
}