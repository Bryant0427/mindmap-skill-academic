# Examples README

This directory contains working examples demonstrating how to use mindmap-skill-academic for different research scenarios.

## Files

### research-paper-example.json
**Use Case**: Technical and scientific research

Demonstrates generating a mindmap for deep learning attention mechanism research using natural language input.

```bash
# To use this example:
npm install
npm run build
node -e "
import('./dist/index.js').then(m => {
  const gen = new m.MindmapGenerator();
  const example = require('./examples/research-paper-example.json');
  gen.generate(example).then(result => {
    result.saveAsXMind('./output/research-paper.xmind');
    console.log('✅ Generated: research-paper.xmind');
  });
});
"
```

### literature-review-example.json
**Use Case**: Organizing research on a policy or topic

Demonstrates a structured JSON input for Belt and Road Initiative research with multiple dimensions (political, economic, cultural).

### humanities-research-example.json
**Use Case**: Literary and humanities analysis

Demonstrates natural language input for literary analysis - specifically on female characters in Dream of the Red Chamber (红楼梦).

## Running Examples

### Option 1: TypeScript Examples

```bash
# Install dependencies
npm install

# Build project
npm run build

# Run example
npx ts-node examples/typescript-example.ts
```

### Option 2: Node.js Examples

```bash
# Install dependencies
npm install

# Build project
npm run build

# Run example directly with CommonJS
node examples/nodejs-example.js
```

### Option 3: Python Examples

```bash
# Install dependencies
pip install -r requirements.txt

# Run example
python examples/python-example.py
```

## Example Patterns

### Pattern 1: Quick Natural Language Generation

```typescript
import { MindmapGenerator } from 'mindmap-skill-academic';

async function quickGenerate() {
  const generator = new MindmapGenerator();
  
  const result = await generator.generate({
    topic: 'Your research topic',
    description: 'Detailed description of your research',
    inputType: 'naturalLanguage',
    autoSelectTheme: true
  });
  
  await result.saveAsXMind('./output/result.xmind');
}

quickGenerate();
```

### Pattern 2: Using Templates

```typescript
import { ResearchPaperTemplate, MindmapGenerator } from 'mindmap-skill-academic';

async function usingTemplate() {
  const template = new ResearchPaperTemplate();
  const mindmapNode = template.generate({
    title: 'Your title',
    researchQuestion: 'Your research question',
    methodology: 'Your methodology',
    expectedResults: 'Expected results'
  });
  
  const generator = new MindmapGenerator();
  const result = await generator.generate({
    topic: mindmapNode.text,
    structure: mindmapNode,
    inputType: 'structured'
  });
  
  await result.saveAsXMind('./output/template-result.xmind');
}

usingTemplate();
```

### Pattern 3: Structured JSON Input

```typescript
import { MindmapGenerator } from 'mindmap-skill-academic';

async function structuredInput() {
  const generator = new MindmapGenerator();
  
  const result = await generator.generate({
    topic: 'Main topic',
    structure: {
      text: 'Root node',
      children: [
        {
          text: 'Main branch 1',
          children: [
            { text: 'Sub-branch 1.1' },
            { text: 'Sub-branch 1.2' }
          ]
        },
        { text: 'Main branch 2' }
      ]
    },
    inputType: 'structured'
  });
  
  await result.saveAsXMind('./output/structured-result.xmind');
}

structuredInput();
```

## Research Domains

Examples organized by research domain:

### Humanities & Social Sciences
- `humanities-research-example.json` - Literary analysis

### Social Research & Surveys
- Social science study frameworks
- Survey design patterns
- Comparative analysis examples

### Science & Engineering
- `research-paper-example.json` - Technical research
- Survey framework patterns
- Experimental design examples

### Education & Curriculum
- Course planning examples
- Learning pathway design
- Knowledge mapping examples

## Output Examples

All examples generate outputs in multiple formats:

```bash
output/
├── result.xmind          # XMind format (editable in XMind)
├── result.json           # JSON format (for processing)
├── result.md             # Markdown format (for documentation)
└── result_citations.bib  # BibTeX format (for LaTeX)
```

## Tips for Creating Your Own Examples

1. **Start Simple**: Begin with natural language input for quick prototyping
2. **Use Templates**: Leverage existing templates that match your research structure
3. **Refine Structure**: Use structured JSON input for precise control
4. **Add Metadata**: Include author, keywords, and descriptions
5. **Choose Theme**: Let AI auto-select or specify your preferred theme
6. **Export Strategically**: Use different formats for different purposes

## Contributing Examples

Have a great example? Share it with the community:

1. Create your example JSON or code file
2. Add documentation with description and use case
3. Submit a Pull Request

## Questions or Issues?

- Check [API Reference](../docs/API-REFERENCE.md) for detailed documentation
- See [Research Scenarios](../docs/RESEARCH-SCENARIOS.md) for more use cases
- Open an [Issue](https://github.com/Bryant0427/mindmap-skill-academic/issues)

---

Happy researching! 🎓📚
