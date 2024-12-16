import React from 'react';
import BackButton from "../../components/BackButton/BackButton";
import ConnectButton from "../../components/ConnectButton/ConnectButton";

const FriendsPage = () => {
    return (
        <div className="app-friends-container">
            <div className={'friends-page-header'}>
                <BackButton/>
                <ConnectButton className={'connect-button-friends'} authClassName={'connect-button-auth-friends'}/>
            </div>
            <div className={'referral-ton-container'}>
                <div className={'referral-ton'}>
                    <span>YOU'VE ALREADY RECEIVED</span>
                    <div>
                        <img src="" alt=""/>
                        <span>TON 30</span>
                    </div>
                </div>
                <div className={'referral-ton'}>
                    <div>
                        <img src="" alt=""/>
                        <span>TON 30</span>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div className={'text-container'}>
                <p>INVITE FRIENDS AND GET 50%</p>
                <p>
                    OF THEIR DONAT IN
                    <span>
                        <img src="" alt=""/>
                    </span>
                    TON
                </p>
            </div>
            <span>X FRIENDS</span>
        </div>
    );
};

export default FriendsPage;
