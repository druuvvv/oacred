cmake_minimum_required(VERSION 3.20)

# Definitions
set(PROJECT_NAME_STR file-manager-cpp)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}/target")

# Project title and define versioning
project(${PROJECT_NAME_STR})

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -g -std=c++17")

# Include paths
set(FILE_SYSTEM_MANAGER_INCLUDES ${FILE_SYSTEM_MANAGER_INCLUDES} ${PROJECT_SOURCE_DIR}/src/include/)

# Gather all sources except the main entry point
file(GLOB_RECURSE INC_FILES src/include/*.hpp)
file(GLOB_RECURSE SRC_FILES src/include/*.cpp)

# Dependencies
find_package(Boost COMPONENTS filesystem system unit_test_framework REQUIRED)

# Unit tests
add_subdirectory(test)

# Assign the include directories
include_directories(${Boost_INCLUDE_DIRS} ${FILE_SYSTEM_MANAGER_INCLUDES})

# Build
set(SOURCE_FILES src/runner.cpp ${INC_FILES} ${SRC_FILES}
        src/include/models/File.cpp
        src/include/models/FileSystemItem.cpp
        src/include/models/FileSystemItem.hpp
        src/include/models/Folder.cpp
        src/include/models/Folder.hpp
        src/include/service/FileSystemManager.hpp
        src/include/service/FileSystemManagerImpl.cpp
        src/include/service/FileSystemManagerImpl.hpp
)
add_executable(${PROJECT_NAME_STR} ${SOURCE_FILES})
target_link_libraries(${PROJECT_NAME_STR} ${Boost_LIBRARIES})
