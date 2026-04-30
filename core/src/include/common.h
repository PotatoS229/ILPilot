#if defined(_WIN32)
    #ifndef _WIN32_WINNT              // ✅ ПРАВИЛЬНО: если НЕ определён
        #define _WIN32_WINNT 0x0600   // то определяем
    #endif
    #include <winsock2.h>
    #include <ws2tcpip.h>
    #pragma comment(lib, "ws2_32.lib")
#else
    #include <sys/socket.h>
    #include <sys/types.h>
    #include <unistd.h>
    #include <netdb.h>
    #include <netinet/in.h>
    #include <arpa/inet.h>
    #include <errno.h>
#endif

#include <stdio.h>
#include <string.h>
#include <iostream>

// определяем макросы 
#if defined(_WIN32)
    // Для проверки валидности сокета 
    #define ISVALIDSOCKET(s) ((s) != INVALID_SOCKET)
    // Закрытие сокета
    #define CLOSESOCKET(s) closesocket(s)
    // последняя ошибка
    #define GETSOCKETERRNO() (WSAGetLastError())
#else 
    // Проверка на валидность для сокета
    #define ISVALIDSOCKET(s) ((s) >= 0)
    // Закрытие сокета
    #define CLOSESOCKET(s) close(s)
    // последняя ошибка
    #define GETSOCKETERRNO() (errno)
#endif