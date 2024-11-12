import os
from flask import Flask, render_template

app = Flask(__name__)

# Criação das pastas necessárias, se não existirem
def create_directories():
    if not os.path.exists('static'):
        os.makedirs('static')
    if not os.path.exists('templates'):
        os.makedirs('templates')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    create_directories()
    app.run(debug=True, host='0.0.0.0', port=5000)
