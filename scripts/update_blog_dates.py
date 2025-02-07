#!/usr/bin/env python3

import os
import re
from datetime import datetime
import frontmatter

def update_blog_dates(blog_dir):
    # Find all markdown files in the blog directory
    for filename in os.listdir(blog_dir):
        if not filename.endswith('.md'):
            continue
        
        filepath = os.path.join(blog_dir, filename)
        
        # Extract date from filename (YYYY-MM-DD-*)
        date_match = re.match(r'(\d{4}-\d{2}-\d{2})', filename)
        if not date_match:
            print(f"Warning: Could not extract date from {filename}")
            continue
            
        date_str = date_match.group(1)
        
        # Parse the markdown file with front matter
        with open(filepath, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)
        
        # Add or update the date field
        post['date'] = date_str
        
        # Write the updated content back to the file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(frontmatter.dumps(post))
        
        print(f"Updated date in {filename}")

if __name__ == '__main__':
    blog_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 
                           'src', 'content', 'blog')
    update_blog_dates(blog_dir)
