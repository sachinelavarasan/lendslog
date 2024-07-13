// import { createContext, useEffect, useState } from 'react';
// import { onAuthStateChanged, UserInfo } from 'firebase/auth';

// import { auth } from '@/firebaseConfig';

// export const FirebaseContext = createContext<{
//   user: UserInfo | null;
//   setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
// }>({
//   user: null,
//   setUser: () => {},
// });

// type Props = { children: React.ReactNode };

// export const FirebaseProvider: React.FC<Props> = ({ children }) => {
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState<UserInfo | null>(null);
//   const onAuthStateChange = (user: UserInfo | null) => {
//     console.log('🚀 ~ onAuthStateChange ~ user:', user?.email);
//     setUser(user);
//     if (initializing) setInitializing(false);
//   };
//   useEffect(() => {
//     const subscriber = onAuthStateChanged(auth, onAuthStateChange);
//     return subscriber;
//   }, []);

//   if (initializing) return null;

//   return <FirebaseContext.Provider value={{ user, setUser }}>{children}</FirebaseContext.Provider>;
// };
