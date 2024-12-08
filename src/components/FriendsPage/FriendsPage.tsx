import React, {useState} from 'react';
import './FriendsPage.css'
import FriendsHeader from "../FriendsHeader/FriendsHeader";
import InviteFriendsButton from "../InviteFriendsButton/InviteFriendsButton";
import {fetchUserTonAmount} from "../../api/userService";
import {useTelegram} from "../../hooks/useTelegram";

const FriendsPage = () => {
    const {user} = useTelegram()

    const [tons, setTons] = useState<number | null>(null)

    const updateTonPoints = async () => {
        try {
            const newTons = await fetchUserTonAmount(String(user.id));
            setTons(newTons.ton_balance)
        } catch (error) {
            console.log('Error updating tons', error)
        }
    }

    return (
        <div className={'app-content-container'}>
            <FriendsHeader tons={tons} updateTons={updateTonPoints}/>
            <InviteFriendsButton/>
        </div>
    );
};

export default FriendsPage;
