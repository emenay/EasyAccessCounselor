from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/tasks')
def tasks():
    return render_template('tasks.html')

@app.route('/college_list')
def college_list():
    return render_template('college_list.html')

@app.route('/notes')
def notes():
    return render_template('notes.html')

@app.route('/schedule')
def schedule():
    return render_template('schedule.html')

@app.route('/messages')
def messages():
    return render_template('messages.html')

if __name__ == '__main__':
    app.run(debug=True)