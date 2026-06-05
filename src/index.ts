/**
 * Mindmap Skill for Academic Research
 * Main entry point for the TypeScript/Node.js implementation
 */

export { MindmapGenerator } from './core/generator';
export { MindmapParser } from './core/parser';
export { Themes, ThemeType } from './core/themes';
export { XMindGenerator } from './formats/xmind';
export { CitationHandler, CitationFormat } from './utils/citation-handler';

// Templates
export { ResearchPaperTemplate } from './academic-templates/research-paper';
export { LiteratureReviewTemplate } from './academic-templates/literature-review';
export { ConceptAnalysisTemplate } from './academic-templates/concept-analysis';
export { ArgumentStructureTemplate } from './academic-templates/argument-structure';
export { HistoricalTimelineTemplate } from './academic-templates/historical-timeline';
export { ComparativeAnalysisTemplate } from './academic-templates/comparative-analysis';
export { SurveyFrameworkTemplate } from './academic-templates/survey-framework';
export { BookAnalysisTemplate } from './academic-templates/book-analysis';

// Types
export type { MindmapNode } from './types/mindmap';
export type { GeneratorOptions } from './core/generator';

/**
 * Quick start example
 */
export async function quickStart() {
  const { MindmapGenerator } = await import('./core/generator');
  const generator = new MindmapGenerator();
  
  console.log('Mindmap Skill for Academic Research initialized successfully!');
  console.log('Visit documentation for usage examples and templates.');
  
  return generator;
}
