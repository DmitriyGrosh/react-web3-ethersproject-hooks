import React, { useState } from 'react';

import Provider from "./components/provider/Provider";

import './App.css';
import Header from "./components/header/Header";
import RequestsWithHooks from "./view/requests/RequestsWithHooks";
import RequestsWithoutHooks from "./view/requests/RequestsWithoutHooks";

function App() {
  const [changeRequests, setChangeRequests] = useState<boolean>(false);

  return (
    <Provider>
      <div className="App">
        <Header />
        <button onClick={() => setChangeRequests(!changeRequests)}>Change requests</button>
        {changeRequests ? <RequestsWithHooks/> : <RequestsWithoutHooks />}
      </div>
    </Provider>
  );
}

export default App;
