import { useState } from "react";

export default function Authenticate({ token }) {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState("");

  async function handleClick() {
    // setSuccessMessage(null);
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setMessage(result.message);
      setUsername(result.data.username.username);
      console.log(result.data);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="form">
      <h3>Next, Click Authenticate Token!</h3>

      {message && message == "Correctly Authenticated!" ? (
        <p className="yea">{`${username}, you have been ${message}`}</p>
      ) : (
        <div></div>
      )}

      {message && message !== "Correctly Authenticated!" ? (
        <p className="nay">Failed Authentication-- {message}!</p>
      ) : (
        <div></div>
      )}

      <button onClick={handleClick}>Authenticate Token </button>
    </div>
  );
}
