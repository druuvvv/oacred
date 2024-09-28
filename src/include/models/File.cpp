#include "File.hpp"


File::File(const std::string& name) : FileSystemItem(name) {}

bool File::isFolder() const {
    return false;
}

