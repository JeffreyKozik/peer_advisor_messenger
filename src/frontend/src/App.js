import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import LexChat from "react-lex-plus";

{/* <main className="container">
  <iframe className="chatbot" src="https://d24xr7mrjs4q2n.cloudfront.net/index.html"></iframe>
</main> */}

function App() {
  return (
    <LexChat
      botName="Peer Advisor Messenger"
      IdentityPoolId="us-east-1:252959472123:userpool/us-east-1_PhLx5g9VC"
      placeholder="Please Enter Your Message"
      backgroundColor="#FFFFFF"
      height={430}
      region="us-east-1"
      headerText="Chat with pam"
      headerStyle={{ backgroundColor: "#0a304e", fontSize: "25px" }}
      greeting={
        "Hello, how can I help? You can say things like 'help' to get more info"
      }
    />
  );
}

export default App;


// function App() {
//   // store users in a new variable
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     let fetchData = async () => {
//       let response = await fetch('/api/users')
//       let json = await response.json()
//       setUsers(json)
//     }
//     fetchData()
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h1>Users</h1>
//         {users.map((user) => <p>
//           {user.username} {user.email}
//         </p>
//         )}
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
