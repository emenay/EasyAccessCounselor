from flask import Flask, render_template
app = Flask(__name__)

import about
import caseload_management
import college_list
import messages
import notes
import schedule
import tasks

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)
