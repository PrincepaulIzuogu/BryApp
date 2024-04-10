# Use the official Python image as base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Python dependencies file to the working directory
COPY Server/requirements.txt .

# Install wheel
RUN pip install wheel


# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Docker Compose
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://get.docker.com -o get-docker.sh && \
    sh get-docker.sh && \
    docker --version && \
    curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose && \
    docker-compose --version

# Install Node.js and npm
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs npm

# Install Node.js dependencies
COPY App/package.json App/package-lock.json ./App/
RUN cd App && npm install

# Copy the entire project directory into the container
COPY . .

# Expose port 8000 for FastAPI app
EXPOSE 8000

# Run postCreateCommand
CMD ["sh", "-c", "source Server/venv/bin/activate && uvicorn main:app --host 0.0.0.0 --port 8000"]
