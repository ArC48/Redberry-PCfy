import React, { useState } from 'react'

function UserInfoObject() {
    const [userInfoObj, setUserInfoObj] = useState(
        JSON.parse(localStorage.getItem('userInfo')) || {});
        console.log(userInfoObj);
  return userInfoObj;
}

export default UserInfoObject