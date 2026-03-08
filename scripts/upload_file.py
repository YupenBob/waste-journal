#!/usr/bin/env python3
import sys
import os
import requests
import base64

def upload_file(file_path, github_token):
    """Upload a single file to GitHub"""
    # Read file content
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Get relative path from site/ directory
    rel_path = os.path.relpath(file_path, '/root/.openclaw/workspace/projects/rubbish-journal/site')
    
    # GitHub API endpoint
    url = f"https://api.github.com/repos/YupenBob/waste-journal/contents/{rel_path}"
    
    # Encode content
    encoded_content = base64.b64encode(content.encode('utf-8')).decode('utf-8')
    
    # Get current SHA if file exists
    headers = {'Authorization': f'token {github_token}'}
    response = requests.get(url, headers=headers)
    
    data = {
        'message': f'Upload {rel_path}',
        'content': encoded_content
    }
    
    if response.status_code == 200:
        sha = response.json()['sha']
        data['sha'] = sha
    
    # Upload file
    response = requests.put(url, headers=headers, json=data)
    
    if response.status_code in [200, 201]:
        print(f"✅ {rel_path} uploaded successfully")
        return True
    else:
        print(f"❌ Failed to upload {rel_path}: {response.status_code} - {response.text}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 upload_file.py <file_path> <github_token>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    github_token = sys.argv[2]
    
    upload_file(file_path, github_token)