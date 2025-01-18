import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
const getUser = () => {
  return window.localStorage.getItem("user");
};
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(getUser);

  const changeUser = (newUser) => {
    if (user === newUser) return;

    setUser(newUser);
    window.localStorage.setItem("user", newUser);
  };

  const removeUser = () => {
    setUser(null);
    window.localStorage.removeItem("user");
  };
  useEffect(() => {
    const user = getUser();
    if (user) {
      changeUser(getUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, changeUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a ModalProvider");

  return context;
}
