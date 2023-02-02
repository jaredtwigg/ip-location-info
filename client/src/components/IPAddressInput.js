import { useRef, useState } from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";
import classes from "./IPAddressInput.module.css";
import ErrorModal from "./UI/ErrorModal";

const IPAddressInput = (props) => {
  const ipInputRef = useRef();
  const [error, setError] = useState();
  const [ipDetails, setIpDetails] = useState();

  const ipSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredIP = ipInputRef.current.value;
    const regExp = /[a-zA-Z]/;
    const ipFormatRegExp = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

    console.log("INPUT VAL", enteredIP);

    if(enteredIP.trim().length === 0) {
      setError({
        title: "IP Required",
        message: "Please enter a valid IP address"
    })
    return
    }

    if(regExp.test(enteredIP)) {
      setError({
        title: "Invalid Entry",
        message: "Please enter a valid numaric IP address"
    })
    return
    }

    if(!ipFormatRegExp.test(enteredIP)) {
      setError({
        title: "Invalid IP Address",
        message: "Entered IP address is not valid"
    })
    return
    }

    fetch("http://localhost:5050/api" + "/" + enteredIP)
      .then((res) => res.json())
      .then((data) => {
        setIpDetails(data);
        return console.log("THIS DATA", ipDetails);
      })
      .catch((err) => {
        return console.log(err)
      });

    console.log(ipDetails);

    // props.onAddIP(ipDetails);
    ipInputRef.current.value = "";
  };

  const confirmErrorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={confirmErrorHandler}
        />
      )}
      <Card className={classes.ipinfo}>
        <form>
          <div className={classes.control}>
            <label htmlFor="ipaddress">IP4 Address</label>
            <input
              type="text"
              id="ipaddress"
              className={classes.input}
              ref={ipInputRef}
            />
          </div>
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              onClick={ipSubmitHandler}
            >
              Check IP Address
            </Button>
          </div>
        </form>
      </Card>
      {ipDetails && (
        <Card className={classes.ipinfo}>
          <div className={classes.ipwrapper}>
            <h3>IP Details</h3>
            <p className={classes.ipaddress}>{ipDetails.ip_address}</p>
            <p className={classes.iplat}><span>lat:</span> {ipDetails.ip_latitude}</p>
            <p className={classes.iplong}><span>long:</span> {ipDetails.ip_longitude}</p>
            <p className={classes.iptimezone}>{ipDetails.ip_timezone}</p>
          </div>
        </Card>
      )}
    </>
  );
};

export default IPAddressInput;
