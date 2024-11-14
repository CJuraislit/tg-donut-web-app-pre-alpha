    import React, {useEffect, useState} from 'react';
    import './App.css'
    import {TonConnectUIProvider, useTonWallet,} from "@tonconnect/ui-react";
    import {useTelegram} from "../hooks/useTelegram";
    import ConnectButton from "./ConnectButton/ConnectButton";
    import DonutCountSection from "./DonutCountSection/DonutCountSection";
    import GetDonutButton from "./GetDonutButton/GetDonutButton";


    export const App = () => {
        const {tg} = useTelegram()
        const manifestUrl = process.env.REACT_APP_API_URL + "/tonconnect-manifest.json"
        // const wallet = useTonWallet()

        useEffect(() =>{
            tg.ready()
        },[])

        // const onGetDonutButtonClick = () => {
        //     if (isWalletConnected) {
        //         // Логика перехода на страницу пополнения или открытие модального окна
        //         console.log('Redirecting to top-up page...');
        //     }
        // };

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

        return (
          <TonConnectUIProvider manifestUrl={manifestUrl}>
              <div className="app-container">
                  <ConnectButton/>
                  <DonutCountSection fetchUserPoints={fetchUserPoints}/>
                  {/*<GetDonutButton onGetDonutButtonClick={onGetDonutButtonClick} isWalletConnected={isWalletConnected}/>*/}
              </div>
          </TonConnectUIProvider>

        );
    };

