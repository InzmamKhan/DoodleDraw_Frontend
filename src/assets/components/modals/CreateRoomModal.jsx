import React, { useState } from 'react';
import NeumorphicInput from '../common/NeumorphicInput';
import NeumorphicButton from '../common/NeumorphicButton';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CreateRoomModal = ({ isOpen, onClose, onRoomCreated }) => {
  const [roomName, setRoomName] = useState('');
  const [passwordMode, setPasswordMode] = useState('none');
  const [customPassword, setCustomPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;

    setLoading(true);
    setError('');

    const res = await fetch(`${API_URL}/api/room/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: roomName, // Sent as 'name' so backend req.body.name receives it
        isPublic: passwordMode === 'none',
        securityType: passwordMode,
        password: passwordMode === 'custom' ? customPassword : null,
      }),
    });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create room');

      onRoomCreated(data.room);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="neu-floating bg-[#e0e5ec] p-6 rounded-2xl w-full max-w-md">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Create Canvas Room</h2>

        {error && <div className="text-red-600 text-xs mb-3 font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Room Name</label>
            <NeumorphicInput
              placeholder="e.g. Brainstorming Session"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-2 block">Room Security</label>
            <div className="flex gap-2 mb-3">
              <NeumorphicButton
                active={passwordMode === 'none'}
                onClick={() => setPasswordMode('none')}
                className="flex-1 !text-xs py-1.5"
              >
                Public
              </NeumorphicButton>
              <NeumorphicButton
                active={passwordMode === 'auto'}
                onClick={() => setPasswordMode('auto')}
                className="flex-1 !text-xs py-1.5"
              >
                Auto Password
              </NeumorphicButton>
              <NeumorphicButton
                active={passwordMode === 'custom'}
                onClick={() => setPasswordMode('custom')}
                className="flex-1 !text-xs py-1.5"
              >
                Custom
              </NeumorphicButton>
            </div>

            {passwordMode === 'custom' && (
              <NeumorphicInput
                type="password"
                placeholder="Set Room Password"
                value={customPassword}
                onChange={(e) => setCustomPassword(e.target.value)}
                required
              />
            )}
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <NeumorphicButton onClick={onClose} className="text-gray-500">
              Cancel
            </NeumorphicButton>
            <NeumorphicButton type="submit" disabled={loading} className="text-slate-900 font-semibold">
              {loading ? 'Creating...' : 'Create Room'}
            </NeumorphicButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;