from __main__ import app
from flask import render_template

@app.route('/notes')
def notes():
    return render_template('notes.html')