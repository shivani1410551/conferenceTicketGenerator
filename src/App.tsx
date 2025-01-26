import { useState } from "react";
import Form from "./Components/Form";
import Header from "./Components/Header";
import Logo from "./Components/Logo";
import Ticket from "./Components/Ticket";
import { UserData } from "./Components/types";


const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]); // Manage user data array

  console.log(userData); // Debugging log for user data

  const handleUserData = (item: UserData): void => {
    setUserData((prev) => [...prev, item]); // Add new user to the state array
  };

  return (
    <main
      className="main flexCenter min-h-full text-Neutral0 md:bg-url('/assets/images/background-tablet.png')"
    >
      <div className="p-6 md:w-[44rem] lg:w-[54rem] flexCenter space-y-4 font-font text-[1.25rem]">
        <Logo />
        {userData.length > 0 ? ( // Check if there is any user data
          <Ticket userData={userData} />
        ) : (
          <>
            <Header />
            <Form handleUserData={handleUserData} />
          </>
        )}
      </div>
    </main>
  );
};

export default App;
