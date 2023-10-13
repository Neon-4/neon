# E-Commerce Boiler Plate App - 4Sale
NextJs / Django
## Running Frontend

## Running Backend
- Create root environment outside of repo folder
(python -m venv eCommEnv)
- source
(source environments/eCommEnv/bin/activate (mac) source environments/eCommEnv/Scripts/activate (windows))
- cd to server folder
pip install -r requirements.txt
- make sure the db.sqlite3 file is the latest one in the chat and in the server folder
- make sure  the .env file is also the latest one in the chat and in the server/fourSale folder
start application
- python manage.py runserver


API Endpoints

| Type | Endpoints | Description |
|------| ----------| ------------|
| POST | /api/auth/register | create new user with username, phone number and password |