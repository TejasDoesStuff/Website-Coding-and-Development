"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckLogIn: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('https://connexting.ineshd.com/api/user', { withCredentials: true });
                console.log('Login check response:', response);
                if (response.status === 200) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (isLoggedIn === null) {
        return <></>;
    }

    if (!isLoggedIn) {
        console.log('User not logged in, redirecting to signup');
        window.location.href = '/signup';
    }
    return <></>;
};

export default CheckLogIn;