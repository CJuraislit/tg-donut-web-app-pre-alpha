import React from 'react';
import './InviteFriendsButton.css'
import {useTelegram} from "../../hooks/useTelegram";

const InviteFriendsButton = () => {
    const  {tg, user} = useTelegram()

    const handleInvite = () => {
        if (!user) {
            return
        }

        const referralUrl = `https://t.me/FrontDonutTestBot?start=ref_${user.id}`
        const message = `Join me in Donut, let's cook together! ${referralUrl}`

        tg.openTelegramLink(
           `https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent(message)}`
        )
    }

  return (
      <button
      className={'invite_friends_button'}
      onClick={handleInvite}
      >
        Invite Friends
      </button>
  );
};

export default InviteFriendsButton;
