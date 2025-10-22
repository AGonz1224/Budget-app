# Author: Alberto Gonzalez
# Project name: Budget App
# Date started: October 20, 2025
# Date last edited: October 20, 2025

from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
