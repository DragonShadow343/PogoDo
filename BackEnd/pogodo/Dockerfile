FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

RUN apt-get update && apt-get install -y maven

COPY pom.xml .
COPY src/ src

RUN mvn clean package -DskipTests

CMD ["java", "-jar", "target/pogodo-1.0-SNAPSHOT.jar"]