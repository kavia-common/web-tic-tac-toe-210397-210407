#!/bin/bash
cd /home/kavia/workspace/code-generation/web-tic-tac-toe-210397-210407/tictactoe_frontend
npx eslint 
$ESLINT_EXIT_CODE
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

