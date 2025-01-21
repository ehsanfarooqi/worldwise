import { useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("qwerty");
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </main>
  );
}

export default Login;
