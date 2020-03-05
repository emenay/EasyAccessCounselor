from __main__ import app
from flask import render_template

@app.route('/college_list')
def college_list():
    return render_template('college_list.html')