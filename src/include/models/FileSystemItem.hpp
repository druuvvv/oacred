
#ifndef FILESYSTEMITEM_HPP
#define FILESYSTEMITEM_HPP


#include <string>

class FileSystemItem {
protected:
    std::string name;

public:
    explicit FileSystemItem(const std::string &name);

    std::string getName() const;

    virtual bool isFolder() const = 0;

    virtual ~FileSystemItem() = default;
};

#endif
