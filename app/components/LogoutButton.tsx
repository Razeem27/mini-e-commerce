"use client";

import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await logout();
    window.location.href = "/login"; // Hard redirect to clear client state
  };

  return (
    <form onSubmit={handleLogout}>
      <button
        type="submit"
        className="text-white p-1 cursor-pointer rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Log Out
      </button>
    </form>
  );
}