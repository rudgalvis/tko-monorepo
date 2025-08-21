# Starting with something that would have been sufficient in docker compose
FROM varnish:stable

# Adding little API server to control varnish from outside
RUN apt-get update && \
    apt-get install -y curl unzip && \
    curl -fsSL https://bun.sh/install | BUN_INSTALL=/usr/local bash && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /nexusApi

# Moving package files first
COPY ./bun.lock ./bun.lock
COPY ./package.json ./package.json

# Installing deps before copying source so it would be cached more often than not
RUN /usr/local/bin/bun install

# Copy rest of the source
COPY . .

RUN /usr/local/bin/bun run build

# Create startup script
# Start Bun app in background and varnish as main process
RUN echo '#!/bin/bash\n\
# Start Bun app in background\n\
cd /nexusApi && /usr/local/bin/bun run start &\n\
\n\
# Start Varnish as main process\n\
exec varnishd -F -f /etc/varnish/default.vcl -s malloc,${VARNISH_SIZE:-256m} -a :80 "$@"' > /start.sh && \
chmod +x /start.sh

ENTRYPOINT ["/start.sh"]