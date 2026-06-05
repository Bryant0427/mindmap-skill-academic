/**
 * Template for historical timeline
 */

import { MindmapNode } from '../types/mindmap';

export interface TimelineEvent {
  period: string;
  events: string[];
  significance?: string;
}

export interface HistoricalTimelineOptions {
  subject: string;
  timeline: TimelineEvent[];
}

export class HistoricalTimelineTemplate {
  generate(options: HistoricalTimelineOptions): MindmapNode {
    return {
      text: `${options.subject} - 历史发展`,
      children: options.timeline.map(event => ({
        text: event.period,
        notes: event.significance,
        children: event.events.map(e => ({ text: e })),
      })),
    };
  }
}
