import React, {useEffect, useState} from 'react';
import './App.css'
import {TonConnectUIProvider, useTonWallet,} from "@tonconnect/ui-react";
import {useTelegram} from "../hooks/useTelegram";
import {fetchUserPoints, fetchUserTonAmount, registerUser, registerUserWithReferral} from "../api/userService";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import DonationPage from "./DonationPage/DonationPage";
import FriendsPage from "./FriendsPage/FriendsPage";
import WelcomeScreen from "./WelcomeScreen/WelcomeScreen";
import BackgroundDots from "./BackgroundDots/BackgroundDots";

export const App = () => {
    const {tg, user, expand} = useTelegram()
    const manifestUrl = process.env.REACT_APP_API_URL + "tonconnect-manifest.json"

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [points, setPoints] = useState<number | null>(null)
    const [fadeOut, setFadeOut] = useState<string>('')

    const checkAndRegisterUser = async () => {
        if (!user) return

        try {
            const pointsData = await fetchUserPoints(String(user.id))
            setPoints(pointsData.points_balance)
            console.log('User found, points loaded')
        } catch (error) {
            console.log('User not found, starting registration')
            await registerUserFlow()
        }
    }

    const registerUserFlow = async () => {
        if (!user) return

        try {
            const referralIdRaw = tg.initDataUnsafe?.start_param
            const referralId = referralIdRaw?.replace(/\D/g, '')

            if(referralId) {
                await registerUserWithReferral(String(user.id), user.username || 'Unknown', referralId)
                console.log('User registered with referralId: ', referralId)
            } else {
                await registerUser(String(user.id), user.username)
                console.log('User registered without referral')
            }

            const pointsData = await fetchUserPoints(String(user.id))
            setPoints(pointsData.points_balance);
        } catch (error) {
            console.log('Error during registration', error);
        }

    }

    const updatePoints = async () => {
        try {
            const newPoints = await fetchUserPoints(String(user?.id));
            setPoints(newPoints.points_balance);
        } catch (error) {
            console.log('Error updating points', error)
        }
    }

    useEffect(() => {
        const initializeApp = async () => {
            tg.ready();
            tg.disableVerticalSwipes()
            expand();
            try {
                await checkAndRegisterUser();
            } catch (error) {
                console.error('Error during registration:', error);
            }
        };

        const minLoadingTime = 6000; // Минимальное время загрузки
        const startTime = Date.now();

        initializeApp().finally(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = minLoadingTime - elapsedTime;
            setTimeout(() => {
                setTimeout(() => setIsLoading(false), 1000)
                setFadeOut('fade-out')
            }, Math.max(remainingTime, 0)); // Гарантируем 2 секунды
        });
    }, []);


    if(isLoading) {
        return (
            <div className={`${fadeOut}`}>
                <BackgroundDots/>
                <WelcomeScreen/>
            </div>
        )
    }


    return (
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <Router>
                <BackgroundDots/>
                <div className={'app-container fade-in'}>
                    <Routes>
                        <Route path={'/'} element={<MainPage points={points} updatePoints={updatePoints}/>}/>
                        <Route path={'/donation'} element={<DonationPage updatePoints={updatePoints}/>}/>
                        <Route path={'/friends'} element={<FriendsPage/>}/>
                        <Route path={'/welcome'}/>
                    </Routes>
                </div>
            </Router>
        </TonConnectUIProvider>
    );
};