from __main__ import app
from flask import render_template

@app.route('/messages')
def messages():
    return render_template('messages.html')