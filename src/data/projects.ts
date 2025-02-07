import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Project {
  name: string;
  year: number;
  description: string;
  source_code: string | null;
  project_url: string | null;
  category: string;
  gradient?: {
    from: string;
    to: string;
  };
  icon?: string;
  tech?: string[];
}

interface ProjectData {
  projects: Project[];
}

const yamlContent = readFileSync(join(__dirname, 'projects.yaml'), 'utf8');
const data = yaml.load(yamlContent) as ProjectData;

export const projects = data.projects;
