export type PlatformType = 
  | 'instagram' 
  | 'facebook' 
  | 'linkedin' 
  | 'twitter' 
  | 'discord';

export type ActionType = 
  | 'message'
  | 'wait';

export interface Message {
  id: string;
  type: ActionType;
  content: string;
  delay: number;
  platform: PlatformType;
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  platform: PlatformType;
}