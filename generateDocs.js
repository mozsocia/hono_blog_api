const fs = require('fs-extra');
const path = require('path');

function generateDocs(modelName) {
  const srcDir = path.join(__dirname, 'src');
  const docsDir = path.join(__dirname, 'docs');

  // Ensure the docs directory exists
  fs.ensureDirSync(docsDir);

  // Remove 'Model' from the end if it exists
  const baseName = modelName.endsWith('Model') ? modelName.slice(0, -5) : modelName;

  const files = [
    { type: 'Model', path: path.join(srcDir, 'models', `${baseName}Model.ts`) },
    { type: 'Routes', path: path.join(srcDir, 'routes', `${baseName}Routes.ts`) },
    { type: 'Controller', path: path.join(srcDir, 'controllers', `${baseName}Controller.ts`) }
  ];

  let docContent = `# ${baseName} Documentation\n\n`;

  files.forEach(file => {
    if (fs.existsSync(file.path)) {
      docContent += `## ${file.type}\n\n\`\`\`typescript\n${fs.readFileSync(file.path, 'utf8')}\n\`\`\`\n\n`;
    } else {
      console.warn(`Warning: ${file.path} does not exist.`);
    }
  });

  const outputPath = path.join(docsDir, `${baseName}Doc.md`);
  fs.writeFileSync(outputPath, docContent);

  console.log(`Documentation for ${baseName} has been generated at ${outputPath}`);
}

const modelName = process.argv[2];

if (!modelName) {
  console.error('Please provide a model name as an argument.');
  process.exit(1);
}

generateDocs(modelName);