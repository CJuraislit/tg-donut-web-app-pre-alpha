import React from 'react';
import './FriendsPage.css'
import BackButton from "../../components/BackButton/BackButton";
import ConnectButton from "../../components/ConnectButton/ConnectButton";
import TonSymbol from '../../assets/images/ChooseTonAmountSymbol.svg'
import TonSymbol13 from '../../assets/images/TonSymbol13.svg'
import InviteFriendsButton from "../../components/InviteFriendsButton/InviteFriendsButton";
import ClaimTonButton from "../../components/ClaimTonButton/ClaimTonButton";
import ClaimDonutButton from "../../components/ClaimDonutButton/ClaimDonutButton";

const FriendsPage = () => {
    return (
        <div className="app-friends-container">

            <div className={'app-friends-wrapper'}>

            <div className={'friends-page-header'}>
                <BackButton/>
                <ConnectButton className={'connect-button-friends'} authClassName={'connect-button-auth-friends'}/>
            </div>

            <div className={'referral-ton-claimed'}>
                <span>YOU'VE ALREADY RECEIVED</span>
                <div>
                    <img src={TonSymbol} alt="" className={'ton-symbol'}/>
                    <span>TON X</span>
                </div>
            </div>

            <div className={'referral-ton-to-claim'}>
                <div className={'referral-ton-to-claim-header'}>
                    <img src={TonSymbol} alt="" className={'ton-symbol'}/>
                    <span>TON X</span>
                </div>
                <div className={'claim-button-container'}>
                    <ClaimTonButton/>
                    <ClaimDonutButton/>
                </div>
            </div>

            <div className={'text-container-friends'}>
                <span>INVITE FRIENDS AND GET 50%</span>
                <div>
                    <span>OF THEIR DONAT IN</span>
                    <img src={TonSymbol13} alt=""/>
                    <span> TON</span>
                </div>
            </div>

            <p className={'friends-number'}>X FRIENDS</p>
            <div className={'friends-list-container'}>

            </div>

            </div>
            <InviteFriendsButton/>
        </div>
    );
};

export default FriendsPage;
