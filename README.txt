SortLab Django Edition
======================

REQUIREMENTS
- Python 3.10 or newer recommended
- Internet is not required after Django is installed

WINDOWS SETUP
1. Extract SortLab_Django.zip.
2. Open the extracted SortLab_Django folder in VS Code.
3. Open Terminal > New Terminal.
4. Create a virtual environment:
   py -m venv .venv
5. Activate it:
   .venv\Scripts\activate
6. Install Django:
   python -m pip install -r requirements.txt
7. Run database setup:
   python manage.py migrate
8. Start the development server:
   python manage.py runserver
9. Open this address in your browser:
   http://127.0.0.1:8000/

IF 'py' DOES NOT WORK
Try:
   python -m venv .venv

IF ACTIVATION IS BLOCKED IN POWERSHELL
Use Command Prompt terminal and run:
   .venv\Scripts\activate.bat
Or in PowerShell for this terminal session:
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   .\.venv\Scripts\Activate.ps1

PROJECT STRUCTURE
manage.py
requirements.txt
sortlab_project/
    settings.py
    urls.py
    wsgi.py
    asgi.py
sortlab/
    views.py
    templates/
        sortlab/
            index.html

The original SortLab interface and JavaScript are served by Django as a template. Sorting is performed in the browser; no database model is required for the visualizer. Use Django's development server for local coursework demonstrations only.
