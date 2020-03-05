from __main__ import app
from flask import render_template

@app.route('/schedule')
def schedule():
    return render_template('schedule.html')