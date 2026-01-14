# #!/bin/bash

# echo "================================"
# echo "  Starting EvalPro Server..."
# echo "================================"
# echo ""

# if ! command -v node &> /dev/null; then
#     echo "ERROR: Node.js is not installed!"
#     echo "Please install Node.js from: https://nodejs.org"
#     exit 1
# fi

# if [ ! -d "node_modules" ]; then
#     echo "Installing dependencies..."
#     npm install
# fi

# echo "Starting server on http://localhost:3000"
# echo "Press Ctrl+C to stop the server"
# echo ""

# # Nur Server starten, KEIN open mehr
# node app.js

# #!/bin/bash

echo "================================"
echo "  Starting EvalPro Server..."
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from: https://nodejs.org"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Starting server on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Server im Hintergrund starten
node app.js &
SERVER_PID=$!

# Kurz warten, bis er wirklich lauscht
sleep 2

# Browser öffnen (Mac / Linux)
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:3000
else
    xdg-open http://localhost:3000 2>/dev/null || sensible-browser http://localhost:3000 2>/dev/null
fi

# Warten, bis der Server-Prozess beendet wird
wait $SERVER_PID
