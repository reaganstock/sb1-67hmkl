import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, MessageSquare, Clock } from 'lucide-react';
import clsx from 'clsx';
import { MessageEditor } from '../sequence/MessageEditor';
import type { Message, ActionType, PlatformType } from '../sequence/types';

interface SequenceStepProps {
  data: {
    platform: PlatformType;
    sequence: Message[];
  };
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function SequenceStep({ data, updateData, onNext, onBack }: SequenceStepProps) {
  const [messages, setMessages] = useState<Message[]>(data.sequence || [{
    id: crypto.randomUUID(),
    type: 'message',
    content: '',
    delay: 0,
    platform: data.platform
  }]);
  const [activeMessageId, setActiveMessageId] = useState(messages[0]?.id);

  const addMessage = (type: ActionType = 'message') => {
    const newMessage = {
      id: crypto.randomUUID(),
      type,
      content: '',
      delay: type === 'wait' ? 24 : 0,
      platform: data.platform
    };
    setMessages([...messages, newMessage]);
    setActiveMessageId(newMessage.id);
  };

  const updateMessage = (id: string, updates: Partial<Message>) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, ...updates } : msg
    ));
  };

  const removeMessage = (id: string) => {
    if (messages.length > 1) {
      setMessages(messages.filter(msg => msg.id !== id));
      if (activeMessageId === id) {
        setActiveMessageId(messages[0].id);
      }
    }
  };

  const handleContinue = () => {
    updateData({ sequence: messages });
    onNext();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-2">Message Sequence</h3>
        <p className="text-sm text-slate-400">Create your outreach sequence</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left sidebar - Message list */}
        <div className="col-span-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveMessageId(message.id)}
              className={clsx(
                'p-4 rounded-lg border cursor-pointer transition-all',
                message.id === activeMessageId
                  ? 'bg-indigo-500/20 border-indigo-500'
                  : 'border-slate-700/50 hover:border-indigo-500/50'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {message.type === 'message' ? (
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-400" />
                  )}
                  <span className="text-white font-medium">
                    {message.type === 'message' ? `Message ${index + 1}` : 'Wait'}
                  </span>
                </div>
                {messages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMessage(message.id);
                    }}
                    className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {message.type === 'wait' && (
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>Wait {message.delay}h</span>
                </div>
              )}
            </motion.div>
          ))}

          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addMessage('message')}
              className="flex-1 p-4 border border-dashed border-slate-700/50 rounded-lg text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Message</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addMessage('wait')}
              className="flex-1 p-4 border border-dashed border-slate-700/50 rounded-lg text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors flex items-center justify-center space-x-2"
            >
              <Clock className="w-4 h-4" />
              <span>Add Wait</span>
            </motion.button>
          </div>
        </div>

        {/* Right side - Message editor */}
        <div className="col-span-8">
          <AnimatePresence mode="wait">
            {messages.map(message => (
              message.id === activeMessageId && (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {message.type === 'wait' ? (
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Wait Duration
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="number"
                          value={message.delay}
                          onChange={(e) => updateMessage(message.id, { delay: parseInt(e.target.value) })}
                          min="1"
                          className="w-24 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                        />
                        <span className="text-slate-400">hours</span>
                      </div>
                    </div>
                  ) : (
                    <MessageEditor
                      content={message.content}
                      platform={data.platform}
                      onChange={(content) => updateMessage(message.id, { content })}
                    />
                  )}
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-4 py-2 text-slate-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={handleContinue}
          disabled={!messages.every(m => m.type === 'wait' || m.content.trim())}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}