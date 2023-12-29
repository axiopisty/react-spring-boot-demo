FROM eclipse-temurin:21-jre-jammy as appbuilder_stage
WORKDIR application
COPY backend-server.jar backend-server.jar
RUN java -Djarmode=layertools -jar backend-server.jar extract

FROM eclipse-temurin:21-jre-jammy
RUN apt-get update && apt-get install -y jq tree && rm -rf /var/lib/apt/lists/*
RUN groupadd -g 999 appuser && \
    useradd -r -u 999 -g appuser appuser && \
    mkdir /app && \
    chown appuser:appuser /app
USER appuser
COPY --chown=appuser:appuser startup.sh /app/startup.sh
COPY --chown=appuser:appuser --from=appbuilder_stage application/dependencies/ /app/
COPY --chown=appuser:appuser --from=appbuilder_stage application/snapshot-dependencies/ /app/
COPY --chown=appuser:appuser --from=appbuilder_stage application/spring-boot-loader/ /app/
COPY --chown=appuser:appuser --from=appbuilder_stage application/application/ /app/

WORKDIR /app
ENTRYPOINT ["/usr/bin/bash", "/app/startup.sh"]
EXPOSE 8080
