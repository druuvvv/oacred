#include "Folder.hpp"
#include <algorithm>

Folder::Folder(const std::string &name) : FileSystemItem(name) {}

void Folder::addItem(FileSystemItem *item) {
    if (getItem(item->getName()) != nullptr) {
        return;
    }
    items.push_back(item);
}

void Folder::removeItem(FileSystemItem *item) {
    auto it = std::find(items.begin(), items.end(), item);
    if (it != items.end()) {
        items.erase(it);
        delete item;
    }
}

FileSystemItem *Folder::getItem(const std::string &name) const {
    for (const auto &item: items) {
        if (item->getName() == name) {
            return item;
        }
    }
    return nullptr;
}

bool Folder::isFolder() const {
    return true;
}

const std::vector<FileSystemItem *> &Folder::getItems() const {
    return items;
}
