import React, {FC, useEffect} from 'react';
import './FriendsHeader.css'

interface FriendsHeaderProps {
    tons: number | null;
    updateTons: () => void;
}

const FriendsHeader:FC<FriendsHeaderProps> = ({tons, updateTons}) => {
    useEffect(() => {
        updateTons()
    }, [updateTons]);


  return (
    <>
      <div className={'friends-header-rules'}>Invite friends and get 50% of their donat in $TON</div>
      <div className={'friends-header-message'}>You’ve already received</div>
        <div className={'ton-amount'}>TON {tons !== null ? tons : '0'}</div>
    </>
  );
};

export default FriendsHeader;

