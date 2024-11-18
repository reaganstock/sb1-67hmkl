import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, Save, Eye, AlertTriangle, Variable, ChevronDown } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import { type PlatformType } from './types';

interface MessageToolbarProps {
  platform: PlatformType;
  characterCount: number;
  onInsertVariable: (variable: string) => void;
  onAiSuggestion: () => void;
  onPreview: () => void;
  onSaveTemplate: () => void;
}

const platformLimits: Record<PlatformType, number> = {
  instagram: 500,
  facebook: 1000,
  linkedin: 2000,
  twitter: 280,
  discord: 2000,
};

const platformVariables: Record<PlatformType, string[]> = {
  linkedin: ['firstName', 'lastName', 'company', 'position'],
  twitter: ['username', 'bio'],
  instagram: ['username', 'fullName'],
  facebook: ['firstName', 'lastName'],
  discord: ['username', 'serverName'],
};

export function MessageToolbar({
  platform,
  characterCount,
  onInsertVariable,
  onAiSuggestion,
  onPreview,
  onSaveTemplate,
}: MessageToolbarProps) {
  const limit = platformLimits[platform];
  const variables = platformVariables[platform];
  const isOverLimit = characterCount > limit;

  return (
    <div className="flex items-center justify-between p-2 bg-slate-800/50 border-t border-slate-700/50">
      <div className="flex items-center space-x-2">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white flex items-center space-x-1">
              <Variable className="w-4 h-4" />
              <span className="text-sm">Variables</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 overflow-hidden">
              <div className="p-2 space-y-1">
                {variables.map((variable) => (
                  <DropdownMenu.Item
                    key={variable}
                    onSelect={() => onInsertVariable(variable)}
                    className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-slate-700/50 cursor-pointer outline-none"
                  >
                    <span className="text-white text-sm">{variable}</span>
                    <span className="text-xs text-slate-400">{`{{${variable}}}`}</span>
                  </DropdownMenu.Item>
                ))}
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAiSuggestion}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <Wand2 className="w-4 h-4" />
              </motion.button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg">
                AI Message Suggestions
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPreview}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg">
                Preview Message
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSaveTemplate}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <Save className="w-4 h-4" />
              </motion.button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg">
                Save as Template
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>

      <div className="flex items-center space-x-3">
        {isOverLimit && (
          <div className="flex items-center text-red-400 text-sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span>Character limit exceeded</span>
          </div>
        )}
        <div className={`text-sm font-medium ${isOverLimit ? 'text-red-400' : 'text-slate-400'}`}>
          {characterCount}/{limit}
        </div>
      </div>
    </div>
  );
}