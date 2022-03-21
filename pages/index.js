import {useAuth} from '../lib/auth';

export default const Index = () => {
  const auth = useAuth();

  return auth.user ? (
      <div>
        <p>Email: {auth.user.email}</p>
        <button onClick={(e) => auth.signOut()}>
          Sign Out
        </button>
      </div>
  ) : (
      <button onClick={(e) => auth.signInWithGithub()}>
        Sign in
      </button>
  )
}