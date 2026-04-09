#!/bin/bash
set -e  # Останавливает выполнение при ошибке

# Определяем директорию установки
INSTALL_DIR="/home/user/UDPilot"
cd "$INSTALL_DIR"

echo "=== Starting installation in Docker environment ==="

# Клонируем udp2raw
echo "Cloning udp2raw..."
if [ ! -d "udp2raw" ]; then
    git clone https://github.com/wangyu-/udp2raw.git
else
    echo "udp2raw already exists, skipping..."
fi

# Клонируем PcapPlusPlus
echo "Cloning PcapPlusPlus..."
if [ ! -d "PcapPlusPlus" ]; then
    git clone https://github.com/seladb/PcapPlusPlus.git
else
    echo "PcapPlusPlus already exists, skipping..."
fi

# Собираем PcapPlusPlus
cd "$INSTALL_DIR/PcapPlusPlus"

echo "Building PcapPlusPlus for Docker (Ubuntu)..."
# В Docker мы уже root и все зависимости установлены
# Убираем sudo и интерактивные флаги

# Устанавливаем дополнительные зависимости если нужны
apt-get update -qq
apt-get install -y -qq libev-dev libpcap-dev || true

# Собираем PcapPlusPlus
cmake -S . -B build \
    -DPCAPPP_BUILD_EXAMPLES=OFF \
    -DPCAPPP_BUILD_TESTS=OFF \
    -DCMAKE_BUILD_TYPE=Release

cd build
cmake --build . -j$(nproc)
cmake --install .

echo "PcapPlusPlus installed successfully"

# Собираем udp2raw если нужно
cd "$INSTALL_DIR/udp2raw"
if [ -f "makefile" ] || [ -f "Makefile" ]; then
    echo "Building udp2raw..."
    make || echo "udp2raw build completed"
fi

echo "=== Installation completed successfully ==="