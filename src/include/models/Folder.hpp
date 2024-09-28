#ifndef FOLDER_HPP
#define FOLDER_HPP

#include "FileSystemItem.hpp"
#include <vector>
#include <string>

class Folder : public FileSystemItem {
private:
    std::vector<FileSystemItem *> items;
public:
    Folder(const std::string &name);

    void addItem(FileSystemItem *item);

    void removeItem(FileSystemItem *item);

    FileSystemItem *getItem(const std::string &name) const;

    bool isFolder() const override;

    const std::vector<FileSystemItem *> &getItems() const;
};

#endif