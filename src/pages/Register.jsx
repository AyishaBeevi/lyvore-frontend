// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await register(name, email, password, phone);

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }

//       navigate("/");
//     } catch (err) {
//       setError(err.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="container-max py-12">
//       <h1 className="text-2xl font-semibold text-brand-brown">Create account</h1>
//       <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-md">
//         <input
//           className="border p-3 rounded-xl2"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           className="border p-3 rounded-xl2"
//           placeholder="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           className="border p-3 rounded-xl2"
//           placeholder="Phone"
//           type="tel"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//         <input
//           className="border p-3 rounded-xl2"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button className="btn">Register</button>
//       </form>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// }


import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await register(
        form.name,
        form.email,
        form.password,
        form.phone
      );

      if (data.token) localStorage.setItem("token", data.token);

      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="container-max py-12">
      <h1 className="text-2xl font-semibold text-brand-brown">Create account</h1>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-md">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-3 rounded-xl2"
          required
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-3 rounded-xl2"
          required
        />

        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-3 rounded-xl2"
          required
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="border p-3 rounded-xl2"
          required
        />

        <button className="btn">Register</button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
