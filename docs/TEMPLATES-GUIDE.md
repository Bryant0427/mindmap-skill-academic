# Templates Guide

This skill provides 8 pre-built templates for common academic research scenarios.

## Research Paper Template

Use for structuring thesis, journal papers, or research proposals.

```typescript
import { ResearchPaperTemplate } from 'mindmap-skill-academic';

const template = new ResearchPaperTemplate();
const mindmap = template.generate({
  title: 'Your Research Title',
  researchQuestion: 'What are you investigating?',
  hypothesis: 'Your hypothesis',
  methodology: 'How will you conduct research?',
  expectedResults: 'What do you expect to find?',
  relatedWorks: 'Background literature'
});
```

### Generated Structure
- 研究背景与意义 (Background and Significance)
- 研究问题 (Research Question)
- 研究假设 (Hypothesis)
- 研究方法 (Methodology)
  - 样本/对象 (Sample/Subject)
  - 数据收集 (Data Collection)
  - 数据分析 (Data Analysis)
- 预期结果 (Expected Results)
- 研究局限 (Research Limitations)
- 未来研究方向 (Future Research Directions)

## Literature Review Template

Use for organizing and analyzing existing research.

```typescript
import { LiteratureReviewTemplate } from 'mindmap-skill-academic';

const template = new LiteratureReviewTemplate();
const mindmap = template.generate({
  topic: 'Your Research Topic',
  timespan: '2010-2024',
  majorSchools: ['School A', 'School B', 'School C'],
  gaps: ['Gap 1', 'Gap 2']
});
```

### Generated Structure
- 研究热点演进 (Evolution of Research Focus)
- 主要学派与观点 (Major Schools and Viewpoints)
- 关键概念 (Key Concepts)
- 存在的问题 (Existing Problems)
- 研究启示 (Research Implications)

## Concept Analysis Template

Use for in-depth analysis of key concepts.

```typescript
import { ConceptAnalysisTemplate } from 'mindmap-skill-academic';

const template = new ConceptAnalysisTemplate();
const mindmap = template.generate({
  concept: 'Concept Name',
  definition: 'Your definition',
  etymology: 'Word origin',
  scope: ['Scope 1', 'Scope 2']
});
```

## Argument Structure Template

Use for building logical arguments with evidence.

```typescript
import { ArgumentStructureTemplate } from 'mindmap-skill-academic';

const template = new ArgumentStructureTemplate();
const mindmap = template.generate({
  thesis: 'Your main argument',
  mainArguments: ['Argument 1', 'Argument 2', 'Argument 3'],
  counterarguments: ['Counter 1', 'Counter 2']
});
```

## Historical Timeline Template

Use for historical research and temporal analysis.

```typescript
import { HistoricalTimelineTemplate } from 'mindmap-skill-academic';

const template = new HistoricalTimelineTemplate();
const mindmap = template.generate({
  subject: 'Historical Subject',
  timeline: [
    {
      period: '2000-2010',
      events: ['Event 1', 'Event 2'],
      significance: 'This period was significant because...'
    },
    {
      period: '2010-2020',
      events: ['Event 3', 'Event 4']
    }
  ]
});
```

## Comparative Analysis Template

Use for comparing multiple viewpoints or theories.

```typescript
import { ComparativeAnalysisTemplate } from 'mindmap-skill-academic';

const template = new ComparativeAnalysisTemplate();
const mindmap = template.generate({
  topic: 'Comparison Topic',
  perspectives: [
    {
      name: 'School A',
      viewpoint: 'Their viewpoint...',
      strengths: ['Strength 1', 'Strength 2'],
      weaknesses: ['Weakness 1']
    },
    {
      name: 'School B',
      viewpoint: 'Their viewpoint...'
    }
  ]
});
```

## Survey Framework Template

Use for designing survey-based research.

```typescript
import { SurveyFrameworkTemplate } from 'mindmap-skill-academic';

const template = new SurveyFrameworkTemplate();
const mindmap = template.generate({
  researchTopic: 'Survey Topic',
  targetPopulation: 'Population description',
  sampleSize: '500'
});
```

## Book Analysis Template

Use for analyzing academic books and monographs.

```typescript
import { BookAnalysisTemplate } from 'mindmap-skill-academic';

const template = new BookAnalysisTemplate();
const mindmap = template.generate({
  title: 'Book Title',
  author: 'Author Name',
  year: '2020'
});
```

## Combining Templates with Generator

```typescript
import { MindmapGenerator, ResearchPaperTemplate } from 'mindmap-skill-academic';

const template = new ResearchPaperTemplate();
const mindmapNode = template.generate({...});

const generator = new MindmapGenerator();
const result = await generator.generate({
  topic: mindmapNode.text,
  structure: mindmapNode,
  inputType: 'structured',
  autoSelectTheme: true
});

await result.saveAsXMind('./output/mindmap.xmind');
```
