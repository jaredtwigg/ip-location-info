import classes from "./IPAddressDetails.module.css";
import Card from "./UI/Card";

// TO DO once issue parsing IP data in App.js is fixed, add 
// this component to App.js and remove IP details display in IPAddressInput.js 

const IPAddressDetails = (props) => {
  return (
    <Card className={classes.address}>
      <ul>
        {props.ips.map((ip) => (
          <li key={ip.id}>
            <h3>{ip.ip}</h3>
            <p>Latitude: {ip.lat} | Longitude: {ip.long}</p>
            <p>{ip.timezone}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default IPAddressDetails;