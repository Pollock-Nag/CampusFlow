import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useCreateUserMutation } from '../../features/user/userApi';
import { useNavigate } from 'react-router-dom';
function GoogleAuth() {
  const navigate = useNavigate();
  const [createUser, { data: createdUser, error, isLoading, isSuccess }] =
    useCreateUserMutation();
  console.log(createdUser);
  console.log(error);
  const logInUser = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decode = jwt_decode(token);
    const user = {
      name: decode.given_name,
      email: decode.email,
      role: 'hr',
      githubUsername: 'hr-dummy-github',
    };
    createUser(user);
    // console.log(user);

    Cookies.set(
      'hrauth',
      JSON.stringify({
        accessToken: token,
        user: user,
        role: user.role,
      }),
      { expires: 1 } // 1 day
    );
    navigate('/hr/query');
  };

  return (
    <div className="flex justify-center ">
      <GoogleOAuthProvider clientId="531260105922-o9dbq6i20vtmdj6e80ndph5ftc839f7e.apps.googleusercontent.com">
        <GoogleLogin
          width={50}
          height={500}
          outline={'none'}
          size="large"
          // theme="filled_black"
          // useOneTap
          onSuccess={logInUser}
          onError={() => {
            console.log('Login Failed');
          }}
          // type={'icon'}
        />
      </GoogleOAuthProvider>
      {/* asdasf */}
    </div>
  );
}

export default GoogleAuth;
