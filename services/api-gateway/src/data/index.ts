import fs from 'fs';
import path from 'path';

const dataDir = path.resolve(process.cwd(), '../../data/seed');

export const species = JSON.parse(fs.readFileSync(path.join(dataDir, 'species.json'), 'utf-8'));
export const toxicity = JSON.parse(fs.readFileSync(path.join(dataDir, 'toxicity.json'), 'utf-8'));
export const survivalGuide = JSON.parse(fs.readFileSync(path.join(dataDir, 'survival-guide.json'), 'utf-8'));

