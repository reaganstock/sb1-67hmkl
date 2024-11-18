import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Linkedin, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'twitter', name: 'Twitter', icon: Twitter },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
  { id: 'discord', name: 'Discord', icon: MessageSquare },
];

interface NameStepProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
}

export function NameStep({ data, updateData, onNext }: NameStepProps) {
  const [name, setName] = useState(data.name || '');
  const [platform, setPlatform] = useState(data.platform || '');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!name.trim()) {
      setError('Please enter a campaign name');
      return;
    }
    if (!platform) {
      setError('Please select a platform');
      return;
    }
    updateData({ name, platform });
    onNext();
  };

  return (
    <div className="space-y-8">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
          Campaign Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          className={clsx(
            'w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white placeholder-slate-400',
            'focus:outline-none focus:ring-2 transition-all',
            error ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-700/50 focus:ring-indigo-500/20 focus:border-indigo-500'
          )}
          placeholder="Enter campaign name..."
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-4">
          Select Platform
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {platforms.map(({ id, name: platformName, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setPlatform(id);
                setError('');
              }}
              className={clsx(
                'p-4 rounded-lg border transition-all',
                platform === id
                  ? 'bg-indigo-500/20 border-indigo-500'
                  : 'border-slate-700/50 hover:border-indigo-500/50'
              )}
            >
              <Icon className={clsx(
                'w-6 h-6 mx-auto mb-2',
                platform === id ? 'text-indigo-400' : 'text-slate-400'
              )} />
              <p className={clsx(
                'text-sm font-medium',
                platform === id ? 'text-white' : 'text-slate-400'
              )}>
                {platformName}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}