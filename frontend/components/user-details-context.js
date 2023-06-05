import { createContext, useState } from "react";

export const userDetailsContext = createContext();

const UserDetailsProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [token, setToken] = useState();
  const [username, setUsername] = useState("");
  return (
    <userDetailsContext.Provider
      value={[
        isSignedIn,
        setIsSignedIn,
        token,
        setToken,
        username,
        setUsername,
      ]}
    >
      {props.children}
    </userDetailsContext.Provider>
  );
};

export default UserDetailsProvider;
