# Use the official SQLite image as base
FROM alpine:latest

# Set the working directory in the container
WORKDIR /database

# Install SQLite
RUN apk add --no-cache sqlite

# Copy the database file into the container
COPY Server/database/database.db .

# Expose the port used by the database (SQLite does not use a network port)
 EXPOSE 5432

# Command to start the database server
CMD ["sqlite3", "database.db"]
