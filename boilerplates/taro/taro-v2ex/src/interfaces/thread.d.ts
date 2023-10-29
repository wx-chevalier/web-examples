import { INode } from './node'
import { IMember } from './member'

export interface IThread {
  node: INode,
  member: IMember,
  last_reply_by: string;
  last_touched: number;
  title: string;
  url: string;
  created: number;
  content: string;
  content_rendered: string;
  last_modified: number;
  replies: number;
  id: number;
}

