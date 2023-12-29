JAVA_OPTS=${JAVA_OPTS:=""}
if [[ "${DEBUG_APPLICATION}" == "true" ]]; then
  JAVA_OPTS="${JAVA_OPTS} -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"
fi

JAVA_OPTS="$JAVA_OPTS -Djava.security.egd=file:/dev/./urandom"

JAVA_MAIN_CLASS="org.springframework.boot.loader.launch.JarLauncher"

echo "startup.sh: INFO: Launching api backend-server with command: java ${JAVA_OPTS} ${JAVA_MAIN_CLASS}"

java ${JAVA_OPTS} ${JAVA_MAIN_CLASS}