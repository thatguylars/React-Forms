import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const MIN_USERNAME_LENGTH = 8;

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null); // Clear any previous errors

    if (username.length < MIN_USERNAME_LENGTH) {
      setError("Username must be at least 8 characters long.");
      return; // Prevent further processing if validation fails
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setToken(data.token); // Set token in state on successful signup
        // Optionally, navigate to another page or show a success message
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during signup. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button
        className="button"
        style={{ backgroundColor: "rebeccapurple" }}
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}
