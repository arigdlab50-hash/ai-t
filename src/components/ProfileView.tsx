import React from 'react';
import { UserProfile } from '../types';
import { User, Mail, Globe, Shield, Bell, Key, LogOut } from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40 flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-white/10 p-1 border border-white/20 overflow-hidden shrink-0">
          <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover rounded-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">{profile.name}</h1>
          <p className="text-xs text-cyan-300 mt-0.5">{profile.email}</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-[11px] font-bold border border-blue-400/30">
            <span>VIP Traveler Member</span>
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Traveler Preferences & Settings</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Full Name</label>
            <input
              type="text"
              readOnly
              value={profile.name}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 font-medium rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Email Address</label>
            <input
              type="email"
              readOnly
              value={profile.email}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 font-medium rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Primary Country / Residence</label>
            <input
              type="text"
              readOnly
              value={profile.passportCountry || 'Pakistan'}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 font-medium rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Preferred Currency</label>
            <select
              value={profile.preferredCurrency}
              disabled
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 font-medium rounded-xl border border-slate-200 outline-none"
            >
              <option value="USD">USD ($) - US Dollar</option>
              <option value="PKR">PKR (Rs) - Pakistani Rupee</option>
              <option value="EUR">EUR (€) - Euro</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
