import { useState } from "react";
export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.length < 6 || password.length < 6) {
      alert("Username & Password must be greater than 5 characters.");
      return;
    }

    console.log("Form Submitted✅");

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: { username },
            password: { password },
          }),
        }
      );
      const result = await response.json();
      setToken(result.token);
      console.log(`Success - Token Returned:${result.token}`);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h1 className="login-title">Welcome</h1>
      {error && <p>{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>
            Username{" "}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Password{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="login-buttton">
          Login
        </button>
      </form>
    </>
  );
}
