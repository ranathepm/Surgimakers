import { execSync } from 'child_process';
import https from 'https';

// Get project info from vercel
const vercelJson = JSON.parse(execSync('vercel project ls --json').toString());
const project = vercelJson.find(p => p.name === 'surgimakers2-1');
console.log('Project:', project?.id, project?.name);
