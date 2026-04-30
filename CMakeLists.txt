cmake_minimum_required(VERSION 3.10)
project(ArpSpoofingProject)

# Set C++ standard and compiler flags
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra -pthread")

# Set pthread linking
set(CMAKE_THREAD_PREFER_PTHREAD TRUE)
set(THREADS_PREFER_PTHREAD_FLAG TRUE)
find_package(Threads REQUIRED)

# Find PcapPlusPlus libraries
find_library(PCAPPP_LIB Pcap++ PATHS /usr/local/lib /usr/lib/x86_64-linux-gnu /usr/lib)
find_library(PACKETPP_LIB Packet++ PATHS /usr/local/lib /usr/lib/x86_64-linux-gnu /usr/lib)
find_library(COMMONPP_LIB Common++ PATHS /usr/local/lib /usr/lib/x86_64-linux-gnu /usr/lib)
find_library(PCAP_LIB pcap PATHS /usr/local/lib /usr/lib/x86_64-linux-gnu /usr/lib)
find_library(LIBNETFILTER_QUEUE_LIB netfilter_queue PATHS /usr/lib/x86_64-linux-gnu /usr/lib) 

# Include directories
include_directories(
    ./include
    .
    /usr/include/pcapplusplus
    /usr/include/libnetfilter_queue
)

# Find all source files recursively
file(GLOB_RECURSE SOURCES 
    "./core/src/*.cpp"
)

# Set output directory
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/./release_project)

# Create executable
add_executable(main ${SOURCES})

# Link libraries
target_link_libraries(main
    Threads::Threads
    ${PCAPPP_LIB}
    ${PACKETPP_LIB}
    ${COMMONPP_LIB}
    ${PCAP_LIB}
    pthread
    ${LIBNETFILTER_QUEUE_LIB}

)

# If libraries not found by find_library, try direct linking
if(NOT PCAPPP_LIB OR NOT PACKETPP_LIB OR NOT COMMONPP_LIB)
    target_link_libraries(main
        -L/usr/local/lib
        -L/usr/lib/x86_64-linux-gnu
        -L/usr/lib
        -lPcap++
        -lPacket++
        -lCommon++
        -lpcap
    )
endif()

# Show build information
message(STATUS "Build type: ${CMAKE_BUILD_TYPE}\n")
message(STATUS "Source files: ${SOURCES}\n")
message(STATUS "Output directory: ${CMAKE_RUNTIME_OUTPUT_DIRECTORY}\n")
message(STATUS "${LIBNETFILTER_QUEUE_LIB}\n")