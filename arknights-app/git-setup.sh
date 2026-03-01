#!/bin/bash
# Git branching setup following "A Successful Git Branching Model"
# Run this once after cloning / creating your GitHub repo

# Initialize git
git init
git add .
git commit -m "feat: initial project structure"

# Create and push main (first delivery archived)
git branch -M main
git checkout -b feature/first-delivery
git push -u origin feature/first-delivery

# Go back to main
git checkout main

# Create develop branch
git checkout -b develop
git push origin develop

# Create second-delivery feature branch from develop
git checkout -b feature/second-delivery
git add .
git commit -m "feat: second delivery – complete Arknights fan site" --allow-empty
git push origin feature/second-delivery

# Merge second-delivery into develop
git checkout develop
git merge feature/second-delivery --no-ff -m "merge: feature/second-delivery into develop"
git push origin develop

# Merge develop into main (production)
git checkout main
git merge develop --no-ff -m "merge: develop into main for second delivery"
git push origin main

echo "All branches created and pushed:"
echo "  main                   – showable production version"
echo "  develop                – integration branch"
echo "  feature/first-delivery – archived first delivery"
echo "  feature/second-delivery– second delivery feature branch"
