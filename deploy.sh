#!/bin/bash

# 🚀 Portillos Restaurante - Deployment Script
# This script helps deploy the website to GitHub Pages

echo "🚀 Portillos Restaurante - Deployment Script"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized"
    echo "Run: git init"
    exit 1
fi

# Check if we have commits
if ! git rev-parse HEAD >/dev/null 2>&1; then
    echo "❌ No commits found"
    echo "Run: git add . && git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote origin is configured
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "⚠️  No remote origin configured"
    echo "Please add your GitHub repository:"
    echo "git remote add origin https://github.com/[username]/portillosrestaurant.git"
    echo ""
    echo "Or if you haven't created the repository yet:"
    echo "1. Go to https://github.com/new"
    echo "2. Create repository: portillosrestaurant"
    echo "3. Run: git remote add origin https://github.com/[username]/portillosrestaurant.git"
    exit 1
fi

echo "✅ Git repository is ready"
echo ""

# Add all files
echo "📁 Adding all files..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy Portillos Restaurante website - $(date)"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Click Settings → Pages"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch and '/' folder"
echo "5. Click Save"
echo ""
echo "Your website will be available at:"
echo "https://[username].github.io/portillosrestaurant"
echo ""
echo "⏱️  GitHub Pages typically takes 5-10 minutes to deploy"
