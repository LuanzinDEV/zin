FROM maven:3.9.11-eclipse-temurin-21 AS dev
WORKDIR /workspace
RUN apt-get update \
  && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*
COPY pom.xml mvnw mvnw.cmd ./
RUN chmod +x mvnw
CMD ["./mvnw", "spring-boot:run", "-Dspring-boot.run.profiles=dev"]

FROM maven:3.9.11-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY . .
RUN chmod +x mvnw && ./mvnw -B -DskipTests package

FROM eclipse-temurin:21-jre AS runtime
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system zin \
  && useradd --system --gid zin --home /app zin
COPY --from=build /workspace/target/platform-0.1.0-SNAPSHOT.jar /app/zin-platform.jar
USER zin
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/zin-platform.jar"]

