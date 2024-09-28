#include "FileSystemItem.hpp"


FileSystemItem::FileSystemItem(const std::string &name) : name(name) {}

std::string FileSystemItem::getName() const {
    return name;
}
