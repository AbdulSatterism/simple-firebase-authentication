import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, GithubAuthProvider } from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [user, setUser] = useState({})

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(() => {
        setUser({})
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        console.log(user)
        setUser(user)
      })
      .catch(error => {
        console.log(error)
      })
  }


  return (
    <div className="App">
      {/* condition ?true:false */}
      {
        user.uid ?
          <>
            <button onClick={handleSignOut}>sign Out</button>
            <button>Sign Out git</button>
          </>
          :
          <>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
            <button onClick={handleGithubSignIn}>Github Sign In</button>
          </>
      }
      {
        user.uid && <div className="">
          <h3>User name : {user.displayName}</h3>
          <p>Email Address : {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
