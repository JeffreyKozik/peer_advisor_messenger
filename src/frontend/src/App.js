import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import LexChat from "react-lex-plus";
import MyLexChat from './chatbot_component';

{/* <LexChat
        botName="WebUiOrderFlowers"
        IdentityPoolId="us-east-1:708a563d-f972-4cf0-bf91-53f7d1286a5a"
        placeholder="I want to buy flowers"
        backgroundColor="#FFFFFF"
        height={430}
        region="us-east-1"
        headerText="chat with pam"
        headerStyle={{ backgroundColor: "#0a304e", fontSize: "25px" }}
        greeting={
          'Say "I want to buy flowers" to start'
        }
        /> */}

function App() {
  return (
    <main className="container">
      <iframe className="chatbot" src="https://d24xr7mrjs4q2n.cloudfront.net/index.html"></iframe>
      <MyLexChat
      botName="WebUiOrderFlowers"
      IdentityPoolId="us-east-1:708a563d-f972-4cf0-bf91-53f7d1286a5a"
      placeholder="I want to buy flowers"
      backgroundColor="#FFFFFF"
      height={430}
      region="us-east-1"
      headerText="chat with pam"
      headerStyle={{ backgroundColor: "#0a304e", fontSize: "25px" }}
      greeting={
        'Say "I want to buy flowers" to start'
      }
      />
    </main>
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
