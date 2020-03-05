from __main__ import app
from flask import render_template

@app.route('/caseload_management')
def caseload_management():
    return render_template('caseload_management.html')