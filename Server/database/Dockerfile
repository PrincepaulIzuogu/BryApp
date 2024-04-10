# Use the official SQLite image as base
FROM alpine:latest

# Set the working directory in the container
WORKDIR /database

# Copy the database file into the container
COPY database.db .

# Expose the port used by the database
EXPOSE 5432

# Command to start the database server
CMD ["sqlite3", "database.db"]
