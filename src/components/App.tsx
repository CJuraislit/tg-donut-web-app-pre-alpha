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
    import DonutLogo from '../assets/images/DonutLogo.png'
    import {fetchUserPoints} from "../api/userService";

    export const App = () => {
        const {tg, user, expand} = useTelegram()
        const manifestUrl = process.env.REACT_APP_API_URL + "tonconnect-manifest.json"
        const [currentPage, setCurrentPage] = useState<'main' | 'donation' | 'friends'>('main');
        const [selectedOption, setSelectedOption] = useState<number | null>(null)
        const [customAmount, setCustomAmount] = useState<string>('')
        const [points, setPoints] = useState<number | null>(null)
        console.log(process.env.REACT_APP_SERVER_URL)

        const updatePoints = async () => {
            try {
                const newPoints = await fetchUserPoints(String(user?.id));
                setPoints(newPoints.points_balance);
            } catch (error) {
                console.log('Error updating points', error)
            }
        }

        useEffect(() =>{
            tg.ready()
            expand()
        },[])

        const onReceiveTonButtonClick = () => {
            setCurrentPage('friends')
        }

        const onGetDonutButtonClick = () => {
            setCurrentPage('donation')
        };

        const resetCustomAmount = () => {
            setCustomAmount('')
        }

        return (
          <TonConnectUIProvider manifestUrl={manifestUrl}>
              <div className="app-container">
                  <ConnectButton/>
                  {currentPage === 'main' && (
                      <>
                          <img src={DonutLogo} alt="DonutLogo" />
                          <DonutCountSection points={points} updatePoints={updatePoints}/>
                          <GetDonutButton onGetDonutButtonClick={onGetDonutButtonClick} />
                          <ReceiveTonButton onReceiveTonButtonClick={onReceiveTonButtonClick}/>
                      </>
                  )}
                  {currentPage === 'donation' && (
                      <>
                          <div>Make a donut to get $DONUT</div>
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
                          <div>Invite friends and get 50% of their donat in $TON</div>
                          <InviteFriendsButton/>
                      </>
                  )}
              </div>
          </TonConnectUIProvider>

        );
    };

