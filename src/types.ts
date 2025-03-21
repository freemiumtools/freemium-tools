import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tools: Tool[];
}