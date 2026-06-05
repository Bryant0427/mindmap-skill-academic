/**
 * Template for literature review
 */

import { MindmapNode } from '../types/mindmap';

export interface LiteratureReviewOptions {
  topic: string;
  timespan?: string;
  majorSchools?: string[];
  gaps?: string[];
}

export class LiteratureReviewTemplate {
  generate(options: LiteratureReviewOptions): MindmapNode {
    return {
      text: `${options.topic} - 文献综述`,
      notes: `时间跨度: ${options.timespan || '未指定'}`,
      children: [
        {
          text: '研究热点演进',
          children: [
            { text: '早期研究阶段' },
            { text: '发展完善阶段' },
            { text: '当代前沿研究' },
          ],
        },
        {
          text: '主要学派与观点',
          children: (options.majorSchools || ['学派1', '学派2', '学派3']).map(school => ({
            text: school,
            children: [
              { text: '核心观点' },
              { text: '代表学者' },
              { text: '优缺点分析' },
            ],
          })),
        },
        {
          text: '关键概念',
          children: [
            { text: '概念定义' },
            { text: '理论模型' },
            { text: '测量方法' },
          ],
        },
        {
          text: '存在的问题',
          children: (options.gaps || ['问题1', '问题2']).map(gap => ({ text: gap })),
        },
        {
          text: '研究启示',
          children: [
            { text: '理论启示' },
            { text: '实践启示' },
            { text: '研究方向' },
          ],
        },
      ],
    };
  }
}
