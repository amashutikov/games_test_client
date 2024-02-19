import { createContext, useContext, useState, ReactNode } from 'react';
import { UserData } from '../types/User';

interface UserContextType {
  userData: UserData;
  updateUser: (partialUserData: Partial<UserData>) => void;
}

const initialUserData = {
  firstName: '',
  secondName: '',
  email: '',
  id: '',
  country: '',
  image: '',
};

const defaultValue: UserContextType = {
  userData: initialUserData,
  updateUser: () => {},
};

const UserContext = createContext<UserContextType>(defaultValue);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const updateUser = (partialUserData: Partial<UserData>) => {
    setUserData((prev) => {
      return {
        ...prev,
        ...partialUserData,
      };
    });
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  return useContext(UserContext);
};
