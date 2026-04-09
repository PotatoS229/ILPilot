FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get install -y \
    cmake \
    git \
    wget \
    build-essential \
    libnetfilter-queue-dev \
    libnfnetlink-dev \
    libpcap-dev \
    libev-dev \
    libnss3 \
    libnspr4 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libxshmfence1 \
    libgtk-3-0 \
    libdbus-1-3 \
    libx11-xcb1 \
    libxcb1 \
    sudo \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN apt-get update && apt-get install -y curl ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Clone repository
WORKDIR /home/user
RUN git clone https://github.com/PotatoS229/UDPilot.git

# Install Node dependencies
WORKDIR /home/user/UDPilot/app
RUN npm install

# Run installer and build (as root)
WORKDIR /home/user/UDPilot/infrastructure/docker
RUN chmod +x installer.sh && ./installer.sh || echo "Installer completed with warnings"

WORKDIR /home/user/UDPilot/
RUN cmake --build build

# Create user for running
RUN useradd -m -s /bin/bash user && \
    echo "user:password123" | chpasswd && \
    chown -R user:user /home/user/UDPilot

# Switch to user
USER user
WORKDIR /home/user/UDPilot/app

EXPOSE 5173
CMD ["npm", "run", "start"]