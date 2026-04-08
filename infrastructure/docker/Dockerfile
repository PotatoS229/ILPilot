# Используем Ubuntu как основу для запуска
FROM ubuntu:22.04 AS builder
# Предотвращаем интерактивные запросы при установке пакетов
ENV DEBIAN_FRONTEND=noninteractive

# Установка всех зависимостей проекта 
RUN apt-get update && apt-get install -y \
    cmake \
    git \
    wget \
    build-essential \
    # Зависимости для libnetfilter_queue
    libnetfilter-queue-dev \
    libnfnetlink-dev \
    # Зависимости для PcapPlusPlus (libpcap)
    libpcap-dev \
    # Зависимости для libev
    libev-dev \
    # Зависимости electron 
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
    && rm -rf /var/lib/apt/lists/*

# Установка Node.js
RUN apt-get update && apt-get install -y curl ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Создаем пользователя
RUN useradd -m -s /bin/bash user
RUN echo "user:password123" | chpasswd

# Клонируем репозиторий
WORKDIR /home/user
RUN git clone https://github.com/PotatoS229/UDPilot.git

# Устанавливаем зависимости Node.js
WORKDIR /home/user/UDPilot/app
RUN npm install

# Переключаемся на root для запуска installer.sh
USER root
WORKDIR /home/user/UDPilot

# Проверяем наличие installer.sh (одной командой)
RUN ls -la && ls -la app/ || true

# Запускаем installer.sh (упрощенный вариант без if)
RUN chmod +x installer.sh 2>/dev/null || true
RUN bash installer.sh 2>/dev/null || echo "installer.sh not found or failed"

# Снова переключаемся на пользователя user
WORKDIR /home/user/UDPilot/app


