    import React, {useEffect, useState} from 'react';
    import './App.css'
    import {TonConnectUIProvider, useTonWallet,} from "@tonconnect/ui-react";
    import {useTelegram} from "../hooks/useTelegram";
    import ConnectButton from "./ConnectButton/ConnectButton";
    import DonutCountSection from "./DonutCountSection/DonutCountSection";
    import GetDonutButton from "./GetDonutButton/GetDonutButton";
    import ChooseTonAmount from "./ChooseTonAmount/ChooseTonAmount";
    import DonateButton from "./DonateButton/DonateButton";
    import ReceiveTonButton from "./ReceiveTonButton/ReceiveTonButton";
    import InviteFriendsButton from "./InviteFriendsButton/InviteFriendsButton";
    import YourAmountButton from "./YourAmountButton/YourAmountButton";
    import DonutLogo from '../assets/images/DonutLogo.svg'
    import {fetchUserPoints, fetchUserTonAmount, registerUser, registerUserWithReferral} from "../api/userService";
    import WelcomeScreen from "./WelcomeScreen/WelcomeScreen";
    import {CSSTransition} from "react-transition-group";
    import NavigationButtons from "./NavigationButtons/NavigationButtons";
    import FriendsHeader from "./FriendsHeader/FriendsHeader";
    

    export const App = () => {
        const {tg, user, expand} = useTelegram()
        const manifestUrl = process.env.REACT_APP_API_URL + "tonconnect-manifest.json"

        const [isLoading, setIsLoading] = useState<boolean>(true)
        const [currentPage, setCurrentPage] = useState<'main' | 'donation' | 'friends'>('main');

        const [selectedOption, setSelectedOption] = useState<number | null>(null)
        const [customAmount, setCustomAmount] = useState<string>('')
        const [points, setPoints] = useState<number | null>(null)
        const [tons, setTons] = useState<number | null>(null)

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

        const updateTonPoints = async () => {
            try {
                const newTons = await fetchUserTonAmount(String(user.id));
                setTons(newTons.ton_balance)
            } catch (error) {
                console.log('Error updating tons', error)
            }
        }

        const onReceiveTonButtonClick = () => {
            setCurrentPage('friends')
        }

        const onGetDonutButtonClick = () => {
            setCurrentPage('donation')
        };

        const onHomeIconClick = () => {
            console.log('home click')
            setCurrentPage('main')
        }

        const onLeaderboardClick = () => {
            return
        }

        const resetCustomAmount = () => {
            setCustomAmount('')
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

            const minLoadingTime = 2000; // Минимальное время загрузки
            const startTime = Date.now();

            initializeApp().finally(() => {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = minLoadingTime - elapsedTime;
                setTimeout(() => setIsLoading(false), Math.max(remainingTime, 0)); // Гарантируем 2 секунды
            });
        }, []);


        return (
          <TonConnectUIProvider manifestUrl={manifestUrl}>
              {isLoading ? (
                  <WelcomeScreen/>
              ) : (
              <div className={'app-container'}>
              <div className="app-content-container">
                  {currentPage === 'main' && (
                      <>
                          <ConnectButton/>
                          <img src={DonutLogo} alt="DonutLogo" />
                          <DonutCountSection points={points} updatePoints={updatePoints}/>
                          <GetDonutButton onGetDonutButtonClick={onGetDonutButtonClick} />
                          <ReceiveTonButton onReceiveTonButtonClick={onReceiveTonButtonClick}/>
                      </>
                  )}
                  {currentPage === 'donation' && (
                      <>
                          <ConnectButton/>
                          <div className={'donate-page-message'}>Make a donut to get $DONUT</div>
                          <div className={'ton_amount_container'}>
                              <ChooseTonAmount tonNumber={0.5} text={'TON 0.5'} selectedOption={selectedOption} setSelectedOption={(value) => {
                                  resetCustomAmount()
                                  setSelectedOption(value)
                              }}/>
                              <ChooseTonAmount tonNumber={2} text={'TON 2'} selectedOption={selectedOption} setSelectedOption={(value) => {
                                  resetCustomAmount()
                                  setSelectedOption(value)
                              }}/>
                              <ChooseTonAmount tonNumber={10} text={'TON 10'} selectedOption={selectedOption} setSelectedOption={(value) => {
                                  resetCustomAmount()
                                  setSelectedOption(value)
                              }}/>
                              <YourAmountButton selectedOption={selectedOption} setSelectedOption={setSelectedOption} customAmount={customAmount} setCustomAmount={setCustomAmount}/>
                          </div>
                          <DonateButton isDisabled={selectedOption === null} selectedAmount={selectedOption} onTransactionComplete={updatePoints}/>
                      </>
                  )}
                  {currentPage === 'friends' && (
                      <>
                          <FriendsHeader tons={tons} updateTons={updateTonPoints}/>
                          <InviteFriendsButton/>
                      </>
                  )}
              </div>
                  <NavigationButtons HomeHandleClick={onHomeIconClick} LeaderboardHandleClick={onLeaderboardClick}/>
              </div>
                  )}
          </TonConnectUIProvider>

        );
    };

