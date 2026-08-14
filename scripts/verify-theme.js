const fs = require('fs');
const path = require('path');

function verifyTags(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Stripping Liquid tags/comments/logic to focus on HTML structure
  let cleaned = content.replace(/\{%[\s\S]*?%\}/g, '');
  cleaned = cleaned.replace(/\{\{[\s\S]*?\}\}/g, '');
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

  const tagRegex = /<\/?([a-zA-Z1-6]+)(?:\s+[^>]*)?>/g;
  const stack = [];
  const selfClosing = new Set(['img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'rect', 'circle', 'path', 'stop', 'i']);

  let match;
  while ((match = tagRegex.exec(cleaned)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const isClosing = fullTag.startsWith('</');

    if (selfClosing.has(tagName) || fullTag.endsWith('/>')) {
      continue;
    }

    if (isClosing) {
      if (stack.length === 0) {
        return { valid: false, error: `Unexpected closing tag </${tagName}> without open tag` };
      }
      const top = stack.pop();
      if (top.name !== tagName) {
        return { valid: false, error: `Mismatched closing tag </${tagName}>, expected </${top.name}> (opened at index ${top.index})` };
      }
    } else {
      stack.push({ name: tagName, index: match.index });
    }
  }

  if (stack.length > 0) {
    return { valid: false, error: `Unclosed tags remaining: ${stack.map(t => `<${t.name}>`).join(', ')}` };
  }

  return { valid: true };
}

function verifySchema(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (filePath.includes('/sections/') || filePath.includes('\\sections\\')) {
    const schemaMatch = content.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
    if (!schemaMatch) {
      return { valid: false, error: 'Missing {% schema %} block' };
    }
    try {
      JSON.parse(schemaMatch[1].trim());
    } catch (e) {
      return { valid: false, error: `Invalid JSON in schema: ${e.message}` };
    }
  }
  return { valid: true };
}

const sectionsDir = path.join(__dirname, '../sections');
const snippetsDir = path.join(__dirname, '../snippets');

let failed = false;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (file.startsWith('purelane-') && file.endsWith('.liquid')) {
      const fullPath = path.join(dir, file);
      const tagResult = verifyTags(fullPath);
      const schemaResult = verifySchema(fullPath);

      if (!tagResult.valid) {
        console.error(`[FAIL] ${file} (HTML tags): ${tagResult.error}`);
        failed = true;
      } else if (!schemaResult.valid) {
        console.error(`[FAIL] ${file} (Schema): ${schemaResult.error}`);
        failed = true;
      } else {
        console.log(`[PASS] ${file}`);
      }
    }
  });
}

console.log('Verifying Purelane templates and snippets...');
scanDir(sectionsDir);
scanDir(snippetsDir);

if (failed) {
  console.log('\n[FAIL] Theme verification failed.');
  process.exit(1);
} else {
  console.log('\n[PASS] All checks passed successfully.');
  process.exit(0);
}
