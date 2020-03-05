from __main__ import app
from flask import render_template

@app.route('/tasks')
def tasks():
    return render_template('tasks.html')