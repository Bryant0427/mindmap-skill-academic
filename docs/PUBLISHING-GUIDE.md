# 🚀 完整发布指南 - 从零到发布

## 第一步：本地开发和测试

### 1. 克隆并安装依赖

```bash
# 克隆仓库
git clone https://github.com/Bryant0427/mindmap-skill-academic.git
cd mindmap-skill-academic

# 安装依赖
npm install

# 构建项目
npm run build
```

### 2. 在本地测试

创建 `test-example.ts`：

```typescript
import { MindmapGenerator, ResearchPaperTemplate } from './src/index';

async function test() {
  console.log('📝 开始测试...\n');

  // 测试1：使用模板
  console.log('测试1: 使用ResearchPaperTemplate');
  const template = new ResearchPaperTemplate();
  const mindmap = template.generate({
    title: '深度学习研究',
    researchQuestion: '如何改进注意力机制？',
    methodology: '文献分析与实验',
    expectedResults: '提出新的注意力机制'
  });

  const generator = new MindmapGenerator();
  const result = await generator.generate({
    topic: mindmap.text,
    structure: mindmap,
    inputType: 'structured'
  });

  await result.saveAsXMind('./test-output/research.xmind');
  console.log('✅ 已生成: test-output/research.xmind\n');

  // 测试2：自然语言输入
  console.log('测试2: 自然语言输入');
  const result2 = await generator.generate({
    topic: '《红楼梦》的女性形象分析',
    description: '分析林黛玉、薛宝钗等人物',
    inputType: 'naturalLanguage',
    autoSelectTheme: true
  });

  await result2.saveAsXMind('./test-output/humanities.xmind');
  await result2.saveAsMarkdown('./test-output/humanities.md');
  console.log('✅ 已生成: test-output/humanities.xmind');
  console.log('✅ 已生成: test-output/humanities.md\n');

  console.log('🎉 所有测试通过！');
}

test().catch(console.error);
```

运行测试：

```bash
# 用ts-node运行测试
npx ts-node test-example.ts

# 或编译后运行
npm run build
node dist/test-example.js
```

---

## 第二步：发布到npm前的准备

### 1. 更新版本号

编辑 `package.json`：

```json
{
  "name": "mindmap-skill-academic",
  "version": "1.0.0",  // ← 更新版本号
  "description": "Academic-focused skill for generating beautiful mind maps...",
  ...
}
```

或使用npm命��：

```bash
# 查看当前版本
npm pkg get version

# 更新为patch版本 (1.0.0 -> 1.0.1)
npm version patch

# 更新为minor版本 (1.0.0 -> 1.1.0)
npm version minor

# 更新为major版本 (1.0.0 -> 2.0.0)
npm version major
```

### 2. 运行发布前检查

```bash
# 1. 清理和构建
npm run build

# 2. 运行测试（如果有）
npm test

# 3. 代码检查
npm run lint

# 4. 查看将要发布的文件列表
npm pack
```

### 3. 检查 .npmignore 文件

创建 `.npmignore` 来排除不必要的文件：

```
# .npmignore
node_modules/
.git/
.github/
tests/
examples/
docs/
src/
*.ts
.env
.DS_Store
*.log
dist/
build/

# 保留以下文件
!dist/
!package.json
!README.md
!LICENSE
```

或者在 `package.json` 中指定包含的文件：

```json
{
  "files": [
    "dist/",
    "README.md",
    "LICENSE"
  ]
}
```

---

## 第三步：npm账户注册和登录

### 1. 注册npm账户

访问 https://www.npmjs.com/signup

填写：
- Username: 用户名
- Email: 邮箱
- Password: 密码

### 2. 本地登录npm

```powershell
# PowerShell登录
npm login

# 输入用户名
# npm username: bryant0427

# 输入密码
# npm password: ••••••••

# 输入邮箱
# npm email: (this IS public) your-email@example.com

# 输入验证码 (邮箱发送)
# Enter one-time password: 123456
```

### 3. 验证登录

```bash
npm whoami
# 输出: bryant0427
```

---

## 第四步：发布到npm

### 方式1：标准发布（最常用）

```bash
# 1. 最后的构建检查
npm run build

# 2. 提交代码到git
git add .
git commit -m "Release v1.0.0"
git push origin main

# 3. 发布到npm
npm publish

# 输出示例：
# npm notice
# npm notice 📦  mindmap-skill-academic@1.0.0
# npm notice === Tarball Contents ===
# npm notice 1.5kB  package.json
# npm notice 15.2kB dist/index.js
# ...
# npm notice published 15 files to npm

echo "✅ 发布完成！"
```

### 方式2：发布为beta版本

```bash
npm publish --tag beta

# 用户安装：
# npm install mindmap-skill-academic@beta
```

### 方式3：发布为其他tag

```bash
npm publish --tag next
npm publish --tag latest
```

---

## 第五步：验证发布

### 1. 在npm官网查看

访问：https://www.npmjs.com/package/mindmap-skill-academic

### 2. 查看包信息

```bash
npm info mindmap-skill-academic

# 输出：
# mindmap-skill-academic@1.0.0 | MIT | deps: 3 | versions: 1
# Academic-focused skill for generating beautiful mind maps...
# 
# .tarball: https://registry.npmjs.org/mindmap-skill-academic/-/mindmap-skill-academic-1.0.0.tgz
# .shasum: abc123def456...
# .integrity: sha512-xyz...
# .unpackedSize: 1.5 MB
```

### 3. 查看版本历史

```bash
npm view mindmap-skill-academic versions

# 输出示例：
# [ '1.0.0' ]
```

### 4. 从npm安装测试

```bash
# 创建测试目录
mkdir test-npm-install
cd test-npm-install

# 初始化npm项目
npm init -y

# 从npm安装你发布的包
npm install mindmap-skill-academic

# 测试使用
cat > test.js << 'EOF'
const { MindmapGenerator } = require('mindmap-skill-academic');

async function test() {
  const gen = new MindmapGenerator();
  const result = await gen.generate({
    topic: 'Test',
    description: 'Testing npm installation',
    inputType: 'naturalLanguage'
  });
  console.log('✅ Successfully installed and used!');
}

test();
EOF

node test.js
```

---

## 第六步：持续维护和更新

### 1. 修复bug并发布新版本

```bash
# 1. 修改代码
# ... 修复bug ...

# 2. 更新版本号
npm version patch  # 如: 1.0.0 -> 1.0.1

# 3. 构建
npm run build

# 4. 提交
git add .
git commit -m "fix: resolved parsing issue"
git push

# 5. 发布
npm publish
```

### 2. 添加新功能

```bash
# 1. 添加新代码
# ... 新功能代码 ...

# 2. 更新文档
# ... 更新README和docs ...

# 3. 更新版本号
npm version minor  # 如: 1.0.0 -> 1.1.0

# 4. 完整流程
npm run build
git add .
git commit -m "feat: add new template support"
git push
npm publish
```

### 3. 发布重大更新

```bash
npm version major  # 如: 1.0.0 -> 2.0.0
npm run build
git add .
git commit -m "BREAKING CHANGE: refactored API"
git push
npm publish
```

---

## 第七步：用户如何安装你发布的包

一旦发布到npm，用户可以：

### 安装最新版本

```bash
npm install mindmap-skill-academic
```

### 安装特定版本

```bash
npm install mindmap-skill-academic@1.0.0
```

### 安装beta版本

```bash
npm install mindmap-skill-academic@beta
```

### 在项目中使用

```typescript
import { MindmapGenerator, ResearchPaperTemplate } from 'mindmap-skill-academic';

async function main() {
  const generator = new MindmapGenerator();
  const result = await generator.generate({
    topic: 'My Research',
    description: 'Research description',
    inputType: 'naturalLanguage'
  });
  
  await result.saveAsXMind('./mindmap.xmind');
}

main();
```

---

## 完整发布清单

```bash
# ✅ 发布前检查清单

# 1. 代码质量
npm run build      # ✓ 构建成功
npm test           # ✓ 测试通过
npm run lint       # ✓ 代码规范

# 2. 版本管理
npm version patch  # ✓ 更新版本号

# 3. 文档更新
# 编辑 CHANGELOG.md 记录更改
# 编辑 README.md 更新说明

# 4. 提交到git
git add .
git commit -m "Release v1.0.1"
git tag v1.0.1
git push
git push --tags

# 5. npm登录
npm login          # ✓ 已登录

# 6. 发布
npm publish        # ✓ 发布成功

# 7. 验证
npm info mindmap-skill-academic  # ✓ 包信息正确

echo "🎉 所有发布步骤完成！"
```

---

## 常见问题和解决方案

### ❌ 错误: npm ERR! 404 Not Found

**原因**: 包不存在或未发布

**解决**:
```bash
npm info mindmap-skill-academic
# 如果返回404，说明还未发布
npm publish
```

### ❌ 错误: npm ERR! You must be logged in

**原因**: 未登录npm

**解决**:
```bash
npm login
npm whoami  # 验证登录
npm publish
```

### ❌ 错误: npm ERR! no_perms Private mode enable

**原因**: 包名与已有包冲突或网络问题

**解决**:
```bash
# 方案1: 使用scope包名
# 在package.json中修改:
# "name": "@bryant0427/mindmap-skill-academic"
npm publish --access public

# 方案2: 更改包名
# "name": "mindmap-skill-academic-v2"
npm publish
```

### ❓ 如何撤回已发布的版本?

```bash
# 撤回特定版本 (24小时内)
npm unpublish mindmap-skill-academic@1.0.0

# 撤回所有版本 (整个包)
npm unpublish mindmap-skill-academic
```

---

## 总结流程图

```
开发完成
    ↓
本地测试 (npm run build && npm test)
    ↓
更新版本号 (npm version patch/minor/major)
    ↓
提交到git (git add && git commit && git push)
    ↓
登录npm (npm login)
    ↓
发布到npm (npm publish)
    ↓
验证发布 (npm info 包名)
    ↓
✅ 完成！用户可安装使用
```

---

现在你的包已在npm上发布！🎉

用户可以运行:
```bash
npm install mindmap-skill-academic
```

然后在他们的项目中使用你的库！
