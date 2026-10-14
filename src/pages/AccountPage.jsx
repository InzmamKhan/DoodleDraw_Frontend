import React from 'react';
import { useAuth } from '../context/AuthContext';
import NeumorphicButton from '../components/common/NeumorphicButton';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="neu-floating p-8 rounded-3xl w-full max-w-md bg-[#e0e5ec]">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Account Details</h2>

        <div className="flex flex-col gap-4 mb-8">
          <div className="neu-pressed p-4 rounded-xl">
            <span className="text-xs text-gray-500 uppercase font-semibold">Username</span>
            <p className="text-sm font-bold text-gray-800 mt-1">{user?.username}</p>
          </div>

          <div className="neu-pressed p-4 rounded-xl">
            <span className="text-xs text-gray-500 uppercase font-semibold">Email</span>
            <p className="text-sm font-bold text-gray-800 mt-1">{user?.email}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <NeumorphicButton onClick={() => navigate('/')} className="flex-1">
            ⬅️ Back
          </NeumorphicButton>
          <NeumorphicButton onClick={logout} className="flex-1 text-red-600">
            Log Out
          </NeumorphicButton>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;