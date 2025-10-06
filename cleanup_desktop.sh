#!/bin/bash

echo "🧹 Desktop Cleanup Script"
echo "========================="

# Create backup directory first
mkdir -p ~/Desktop/CLEANUP_BACKUP_$(date +%Y%m%d)

echo "📊 Current Desktop size:"
du -sh ~/Desktop/

echo ""
echo "🗑️  Removing large unnecessary files..."

# Remove the largest folders (these are taking up 20GB+)
echo "Removing server backup folder (10GB)..."
if [ -d ~/Desktop/server\ server\ aichatsy.com-9-30-2025 ]; then
    mv ~/Desktop/server\ server\ aichatsy.com-9-30-2025 ~/Desktop/CLEANUP_BACKUP_$(date +%Y%m%d)/
fi

echo "Removing Chatsy-Web folder (3.3GB)..."
if [ -d ~/Desktop/Chatsy-Web ]; then
    mv ~/Desktop/Chatsy-Web ~/Desktop/CLEANUP_BACKUP_$(date +%Y%m%d)/
fi

echo "Removing duplicate backup folders..."
if [ -d ~/Desktop/Chatsy1\ Backup ]; then
    mv ~/Desktop/Chatsy1\ Backup ~/Desktop/CLEANUP_BACKUP_$(date +%Y%m%d)/
fi

if [ -d ~/Desktop/Chatsy-KM\ backup ]; then
    mv ~/Desktop/Chatsy-KM\ backup ~/Desktop/CLEANUP_BACKUP_$(date +%Y%m%d)/
fi

if [ -d ~/Desktop/api ]; then
    mv ~/Desktop/api ~/Desktop/CLEANUP_BACKUP_$(date +%Y%m%d)/
fi

echo "Removing large zip files..."
if [ -f ~/Desktop/aichatsy_5.zip ]; then
    mv ~/Desktop/aichatsy_5.zip ~/Desktop/CLEANUP_BACKUP_$(date +%Y%m%d)/
fi

if [ -f ~/Desktop/Chatsy-KM\ copy.zip ]; then
    mv ~/Desktop/Chatsy-KM\ copy.zip ~/Desktop/CLEANUP_BACKUP_$(date +%Y%m%d)/
fi

echo ""
echo "🧹 Cleaning up build logs in CHATSY folder..."
if [ -d ~/Desktop/CHATSYwe\ need\ to\ fix\ this ]; then
    # Remove build logs
    find ~/Desktop/CHATSYwe\ need\ to\ fix\ this -name "*.log" -size +1M -delete
    find ~/Desktop/CHATSYwe\ need\ to\ fix\ this -path "*/android/app/.cxx/*" -type f -delete
    find ~/Desktop/CHATSYwe\ need\ to\ fix\ this -path "*/.dart_tool/*" -type f -delete
    find ~/Desktop/CHATSYwe\ need\ to\ fix\ this -path "*/build/*" -type f -delete
    find ~/Desktop/CHATSYwe\ need\ to\ fix\ this -name "CMakeFiles" -type d -exec rm -rf {} + 2>/dev/null
fi

echo ""
echo "📊 New Desktop size:"
du -sh ~/Desktop/

echo ""
echo "✅ Cleanup complete!"
echo "📁 Files moved to: ~/Desktop/CLEANUP_BACKUP_$(date +%Y%m%d)/"
echo "🗑️  You can delete this backup folder if you don't need these files."


