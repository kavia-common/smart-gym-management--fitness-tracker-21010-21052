#!/bin/bash
cd /home/kavia/workspace/code-generation/smart-gym-management--fitness-tracker-21010-21052/WebFrontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

