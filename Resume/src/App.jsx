import Nav from "./Nav";
import Login from "./Login";
import Register from "./Register";
import "./App.css";
import { useEffect, useState } from "react";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";

const App = () => {

   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [activeForm, setActiveForm] = useState(null);
   
   useEffect(()=>{
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token)
   }, [])

  return (

    <div className="app-container">
      <Nav 

       isLoggedIn = {isLoggedIn}
       setIsLoggedIn={setIsLoggedIn}
       setActiveForm={setActiveForm}
      />
     

     <div className="auth-wrapper">
     {
      !isLoggedIn && activeForm === "login" && (
         <Login setIsLoggedIn={setIsLoggedIn} setActiveForm={setActiveForm}/>
      )

     }

     {

      !isLoggedIn && activeForm === "register" && (
         <Register setActiveForm={setActiveForm}/> 
      )
     }
      
     </div>

     <div className="mainCont">
       <LeftSide />
        <RightSide />
        
     </div>
     
       
</div>
  );
};

export default App;
