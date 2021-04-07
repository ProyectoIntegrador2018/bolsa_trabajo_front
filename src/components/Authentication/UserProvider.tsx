import React, { createContext, useEffect, useState } from 'react';
import { auth, generateUserDocument } from '../../firebase';

export const UserContext = createContext({user: null});

function UserProvider(props: any) {
  const [user, setUser] = useState({user: null});

  // onMount
  useEffect(() => {
    // setObserver on authUser
    auth.onAuthStateChanged(async (authUser) => {
      const user_local: any = await generateUserDocument(authUser, undefined);
      setUser({user: user_local});
    });
  }, []);

  return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
}

export default UserProvider;