import { useEffect, useState } from "react";
import IPAddressInput from "./components/IPAddressInput";
import IPAddressDetails from "./components/IPAddressDetails";
import "./App.css";

// TO DO: Troubleshoot issue with parsing out data coming in from 'enteredIP' within 'addIPHandler' 

function App() {
  // const [ipList, setIpList] = useState([]);

  // const addIPHandler = (enteredIP) => {
  //   console.log("FROM APP", enteredIP)
  //   setIpList((prevIpList) => {
  //     return [...prevIpList, {ip: enteredIP.ip_address, lat: enteredIP, long: enteredIP, timezone: enteredIP, id: Math.random().toString()}];
  //   })
  // }

  return (
    <>
      <h1>IP Lookup Tool</h1>
      {/* <IPAddressInput onAddIP={addIPHandler} /> */}
      <IPAddressInput />
      {/* <IPAddressDetails ips={ipList} /> */}
    </>
  );
}

export default App;
