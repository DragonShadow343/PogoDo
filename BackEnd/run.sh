#!/bin/bash

# Set paths
LIB_PATH="lib/mysql-connector-j-9.2.0.jar"
SRC_PATH="pogodo/src/main/java"
TARGET_PATH="pogodo/target/classes"
MAIN_CLASS="com.backend.JDBCConnector"

# Create target directory if it doesn't exist
mkdir -p $TARGET_PATH

# Compile Java files
javac -cp "$LIB_PATH:." -d "$TARGET_PATH" $SRC_PATH/com/backend/JDBCConnector.java

# Run Java program
java -cp "$LIB_PATH:$TARGET_PATH" $MAIN_CLASS
