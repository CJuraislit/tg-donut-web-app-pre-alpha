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


    export const App = () => {
        const {tg} = useTelegram()
        const manifestUrl = process.env.REACT_APP_API_URL + "tonconnect-manifest.json"
        const [isMainPage, setIsMainPage] = useState<boolean>(true);
        const [currentPage, setCurrentPage] = useState<'main' | 'donation' | 'friends'>('main');
        const [selectedOption, setSelectedOption] = useState<number | null>(null)

        const fetchUserPoints = async (): Promise<number> => {
            try {
                const response = await fetch('/api/user/points'); // Укажите здесь нужный URL
                if (!response.ok) {
                    throw new Error('Ошибка сети');
                }
                const data = await response.json();
                return data.points; // Предполагается, что сервер возвращает объект с полем "points"
            } catch (error) {
                console.error('Ошибка при получении очков:', error);
                return 0; // Можно вернуть 0 или любое другое значение по умолчанию
            }
        };

        useEffect(() =>{
            tg.ready()
        },[])

        const onReceiveTonButtonClick = () => {
            setCurrentPage('friends')
        }

        const onGetDonutButtonClick = () => {
            setCurrentPage('donation')
        };

        const resetCustomAmount = () => {
            setSelectedOption(null)
        }

        return (
          <TonConnectUIProvider manifestUrl={manifestUrl}>
              <div className="app-container">
                  <ConnectButton/>
                  {currentPage === 'main' && (
                      <>
                          <DonutCountSection fetchUserPoints={fetchUserPoints}/>
                          <GetDonutButton onGetDonutButtonClick={onGetDonutButtonClick} />
                          <ReceiveTonButton onReceiveTonButtonClick={onReceiveTonButtonClick}/>
                      </>
                  )}
                  {currentPage === 'donation' && (
                      <>
                          <div>Make a donut to get $DONUT</div>
                          <div className={'ton_amount_container'}>
                              <ChooseTonAmount tonNumber={0.5} text={'TON 0.5'} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                              <ChooseTonAmount tonNumber={2} text={'TON 2'} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                              <ChooseTonAmount tonNumber={10} text={'TON 10'} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                          </div>
                          <YourAmountButton selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                          <DonateButton isDisabled={selectedOption === null} selectedAmount={selectedOption}/>
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

