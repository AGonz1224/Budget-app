# Author: Alberto Gonzalez
# Project name: Budget App
# Date started: October 20, 2025
# Date last edited: October 20, 2025

from flask import Flask

def create_app():
    app = Flask(__name__)

    @app.route("/")
    def home():
        return "Hello, world! Flask is working 🎉"

    return app
