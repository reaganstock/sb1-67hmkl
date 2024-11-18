import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TextareaAutosize from 'react-textarea-autosize';
import { MessageToolbar } from './MessageToolbar';
import type { PlatformType } from './types';

interface MessageEditorProps {
  content: string;
  platform: PlatformType;
  onChange: (content: string) => void;
}

export function MessageEditor({ content, platform, onChange }: MessageEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  const handleInsertVariable = (variable: string) => {
    const newContent = content + `{{${variable}}}`;
    onChange(newContent);
  };

  const handleAiSuggestion = () => {
    setShowAiSuggestions(!showAiSuggestions);
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleSaveTemplate = () => {
    // TODO: Implement template saving
  };

  const renderPreview = (text: string) => {
    const previewData = {
      firstName: 'John',
      lastName: 'Doe',
      company: 'Acme Inc',
      position: 'CEO',
      username: '@johndoe',
      fullName: 'John Doe',
      bio: 'Software Engineer',
      serverName: 'Tech Community'
    };

    return text.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
      return previewData[variable as keyof typeof previewData] || match;
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <TextareaAutosize
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 resize-none min-h-[200px]"
          placeholder={`Write your ${platform} message...`}
          minRows={8}
          maxRows={12}
        />

        <MessageToolbar
          platform={platform}
          characterCount={content.length}
          onInsertVariable={handleInsertVariable}
          onAiSuggestion={handleAiSuggestion}
          onPreview={handlePreview}
          onSaveTemplate={handleSaveTemplate}
        />
      </div>

      {showPreview && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
        >
          <h4 className="text-sm font-medium text-slate-400 mb-2">Message Preview</h4>
          <div className="whitespace-pre-wrap text-white">
            {renderPreview(content)}
          </div>
        </motion.div>
      )}

      {showAiSuggestions && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
        >
          <h4 className="text-white font-medium mb-3">AI Suggestions</h4>
          <div className="space-y-2">
            <button
              onClick={() => onChange("Hi {{firstName}}, I noticed you're working at {{company}}...")}
              className="w-full p-3 text-left bg-slate-900/50 hover:bg-indigo-500/20 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
            >
              Professional Introduction
            </button>
            <button
              onClick={() => onChange("I came across your profile and was impressed by your work in...")}
              className="w-full p-3 text-left bg-slate-900/50 hover:bg-indigo-500/20 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
            >
              Profile Compliment
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}