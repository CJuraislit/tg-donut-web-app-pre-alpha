import React, {useEffect} from 'react';
import './App.css'
import {TonConnectButton, TonConnectUI, TonConnectUIProvider} from "@tonconnect/ui-react";
import {useTelegram} from "../hooks/useTelegram";


export const App = () => {
    const {tg} = useTelegram()


    useEffect(() =>{
        tg.ready()
    },[])

    return (
      <TonConnectUIProvider manifestUrl="https://4061-135-125-151-37.ngrok-free.app/tonconnect-manifest.json">
          <TonConnectButton/>
      </TonConnectUIProvider>

    );
};

