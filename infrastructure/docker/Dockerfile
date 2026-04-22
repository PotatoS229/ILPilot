FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive \
    NODE_ENV=production

# Install dependencies
RUN apt-get update && apt-get install -y \
    cmake \
    git \
    wget \
    build-essential \
    libnetfilter-queue-dev \f
    libnfnetlink-dev \
    libpcap-dev \
    libev-dev \
    curl \
    ca-certificates \
    sudo \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20.x
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Create user first (лучше создать до клонирования)
RUN useradd -m -s /bin/bash user && \
    mkdir -p /home/user/UDPilot && \
    chown -R user:user /home/user

# Clone repository as user
USER user
WORKDIR /home/user
RUN git clone https://github.com/PotatoS229/UDPilot.git

# Install Node dependencies
WORKDIR /home/user/UDPilot/app
RUN npm install --production

# Build C++ components (as user)
WORKDIR /home/user/UDPilot
RUN cmake -S . -B build && \
    cmake --build build --parallel $(nproc)

# Check if installer is really needed
# Если installer.sh нужен, запустите его с правильной обработкой ошибок:
RUN if [ -f infrastructure/docker/installer.sh ]; then \
        chmod +x infrastructure/docker/installer.sh && \
        ./infrastructure/docker/installer.sh; \
    fi

EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5173 || exit 1

# Use exec form for proper signal handling
CMD ["npm", "run", "start"]
