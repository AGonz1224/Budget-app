# Author: Alberto Gonzalez
# Project name: Budget App
# Date started: October 20, 2025
# Date last edited: October 22, 2025

from flask import Flask, render_template

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def home():
        return render_template('index.html')

    return app
