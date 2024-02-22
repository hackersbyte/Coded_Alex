import { Button } from 'flowbite-react';
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function  OAuth () {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleGoogleClick = async  () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' });
        try{
            const resultsFromGoogle = await  signInWithPopup(auth ,provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultsFromGoogle.user?.displayName || '',
                    email: resultsFromGoogle.user?.email || '',
                    googlePhotoUrl: resultsFromGoogle.user?.photoURL || ''
                }),
                })
            const  data = await  res.json();
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/') 
            }
        } catch (error) {
            console.log('Error : ', error)
        }

    }



    const handleGithubClick = async () => {
        const provider = new GithubAuthProvider();
        provider.addScope('user:email'); // Request user email scope for potential future use

        try {
            const resultsFromGithub = await signInWithPopup(getAuth(app), provider);

            // Extract relevant user data (replace with placeholder values if needed)
            const name = resultsFromGithub.user?.displayName || 'Github User';
            const email = resultsFromGithub.user?.email || 'placeholder@example.com';
            const githubProfileUrl = resultsFromGithub.user?.photoURL || 'https://github.com/octocat.png';

            const res = await fetch('/api/auth/github', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                githubProfileUrl,
            }),
            });

            if (res.ok) {
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
            } else {
            console.error('Error fetching user data:', res.statusText);
            }
        } catch (error) {
            console.error('Error authenticating with Github:', error);
        }
        };
        

        return (
            <div className="flex gap-1">
            <div className="google-login">
                <Button
                    type="button"
                    gradientDuoTone="pinkToOrange"
                    outline
                    onClick={handleGoogleClick}
                >
                    <AiFillGoogleCircle className="w-6 h-6 mr-2" /> Continue with Google
                </Button>
            </div>
            <div className="github-login">
                <Button
                    type="button"
                    gradientDuoTone="pinkToOrange"
                    outline
                    onClick={handleGithubClick}
                >
                    <AiFillGithub className="w-6 h-6 mr-2" /> Continue with Github
                </Button>
            </div>
        </div>
    );

}


