// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, token } = useAuth();
  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
if (!user || !user._id) return <p>Loading user...</p>;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/${user._id}`);
        if (res.data.shippingAddress) setShipping(res.data.shippingAddress);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user._id]);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const saveAddress = async () => {
    setSaving(true);
    try {
      await api.put(`/users/${user._id}/shipping`, shipping, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Shipping address saved successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save address.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || "-"}</p>

        <h3 className="text-lg font-semibold mt-4">Shipping Address (optional)</h3>
        {["address", "city", "state", "zip", "country"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={shipping[field] || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        ))}

        <button
          onClick={saveAddress}
          disabled={saving}
          className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {saving ? "Saving..." : "Save Address"}
        </button>
      </div>
    </div>
  );
}
