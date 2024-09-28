#ifndef FILE_HPP
#define FILE_HPP

#include "FileSystemItem.hpp"

class File : public FileSystemItem {
public:

    explicit File(const std::string &name);

    bool isFolder() const override;
};

#endif