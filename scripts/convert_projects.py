import yaml
import json
import os
from pathlib import Path

# Read YAML file
with open('src/content/projects/projects.yaml', 'r') as f:
    data = yaml.safe_load(f)

# Create projects directory if it doesn't exist
Path('src/content/projects').mkdir(parents=True, exist_ok=True)

# Convert each project to a JSON file
for project in data:
    filename = f"src/content/projects/{project['id']}.json"
    with open(filename, 'w') as f:
        json.dump(project, f, indent=2)

print("Conversion complete!")
