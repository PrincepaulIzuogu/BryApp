# Use the official Python image as base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Python dependencies file to the working directory
COPY ./Server/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js and npm
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Install Node.js dependencies
COPY App/package.json App/package-lock.json ./App/
RUN cd App && npm install

# Copy the entire project directory into the container
COPY . .

# Expose port 8000 for FastAPI app
EXPOSE 8000

# Run postCreateCommand
CMD ["sh", "-c", "source Server/venv/bin/activate && uvicorn main:app --host 0.0.0.0 --port 8000"]
