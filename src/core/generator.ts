/**
 * Main generator for creating academic mindmaps
 */

import { MindmapNode, MindmapMetadata, MindmapData, ThemeType } from '../types/mindmap';
import { MindmapParser, ParserInput, ParsedMindmap } from './parser';
import { Themes } from './themes';
import { XMindGenerator } from '../formats/xmind';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

export interface GeneratorOptions {
  topic: string;
  description?: string;
  structure?: any;
  inputType?: 'naturalLanguage' | 'structured';
  theme?: ThemeType;
  autoSelectTheme?: boolean;
  author?: string;
  version?: string;
}

export interface GeneratedMindmap {
  data: MindmapData;
  save: (filepath: string) => Promise<void>;
  saveAsXMind: (filepath: string) => Promise<void>;
  saveAsMarkdown: (filepath: string) => Promise<void>;
  toJSON: () => string;
  getTheme: () => ThemeType;
}

export class MindmapGenerator {
  /**
   * Generate a mindmap from input
   */
  async generate(options: GeneratorOptions): Promise<GeneratedMindmap> {
    // Parse input
    const parserInput: ParserInput = {
      topic: options.topic,
      description: options.description,
      structure: options.structure,
      inputType: options.inputType || 'naturalLanguage',
    };

    const parsed = MindmapParser.parse(parserInput);

    // Select theme
    let theme: ThemeType = options.theme || 'academic-blue';
    if (options.autoSelectTheme !== false) {
      theme = Themes.suggestTheme(parsed.keywords);
    }

    // Create metadata
    const metadata: MindmapMetadata = {
      title: options.topic,
      author: options.author || 'Researcher',
      created: new Date(),
      modified: new Date(),
      theme,
      version: options.version || '1.0.0',
    };

    // Create mindmap data
    const data: MindmapData = {
      rootTopic: this.assignStylesRecursive(parsed.rootNode, theme, 0),
      metadata,
    };

    // Return mindmap with save methods
    return {
      data,
      save: async (filepath: string) => this.save(data, filepath),
      saveAsXMind: async (filepath: string) => this.saveAsXMind(data, filepath),
      saveAsMarkdown: async (filepath: string) => this.saveAsMarkdown(data, filepath),
      toJSON: () => JSON.stringify(data, null, 2),
      getTheme: () => theme,
    };
  }

  /**
   * Recursively assign styles to nodes based on theme
   */
  private assignStylesRecursive(node: MindmapNode, theme: ThemeType, level: number): MindmapNode {
    const styled = { ...node };
    styled.style = Themes.getNodeStyle(theme, level);
    
    if (styled.children) {
      styled.children = styled.children.map(child => this.assignStylesRecursive(child, theme, level + 1));
    }

    return styled;
  }

  /**
   * Save mindmap as JSON
   */
  private async save(data: MindmapData, filepath: string): Promise<void> {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
  }

  /**
   * Save as XMind format
   */
  private async saveAsXMind(data: MindmapData, filepath: string): Promise<void> {
    const generator = new XMindGenerator();
    await generator.generate(data, filepath);
  }

  /**
   * Save as Markdown
   */
  private async saveAsMarkdown(data: MindmapData, filepath: string): Promise<void> {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const markdown = this.nodesToMarkdown(data.rootTopic, 0);
    fs.writeFileSync(filepath, markdown, 'utf-8');
  }

  /**
   * Convert nodes to markdown format
   */
  private nodesToMarkdown(node: MindmapNode, depth: number): string {
    const indent = '#'.repeat(Math.min(depth + 1, 6));
    let result = `${indent} ${node.text}\n`;

    if (node.notes) {
      result += `\n${node.notes}\n`;
    }

    if (node.children && node.children.length > 0) {
      result += '\n';
      for (const child of node.children) {
        result += this.nodesToMarkdown(child, depth + 1);
      }
    }

    return result + '\n';
  }
}
