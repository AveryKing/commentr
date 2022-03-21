import {useAuth} from '@/lib/auth';
import {Button} from "@chakra-ui/react";
import DashboardShell from "@/components/DashboardShell";

export default function Index() {
    const auth = useAuth();

    return auth.user ? (
        <DashboardShell>
            <p>Email: {auth.user.email}</p>
            <button onClick={(e) => auth.signOut()}>
                Sign Out
            </button>
        </DashboardShell>
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