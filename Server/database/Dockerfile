# Use the official SQLite image as base
FROM alpine:latest

# Set the working directory in the container
WORKDIR /database

# Install SQLite
RUN apk add --no-cache sqlite

# Copy the database file into the container
COPY Server/database/database.db .

# Command to start the database server
CMD ["sqlite3", "database.db"]
