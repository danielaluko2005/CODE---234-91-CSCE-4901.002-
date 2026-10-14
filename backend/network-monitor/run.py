"""run.py - start the API. Capture needs root: sudo ./venv/bin/python run.py"""

import uvicorn

from app.config import HOST, PORT

if __name__ == "__main__":
    uvicorn.run("app.main:app", host=HOST, port=PORT)
