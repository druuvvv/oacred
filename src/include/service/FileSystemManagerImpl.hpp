#ifndef FILESYSTEMMANAGERIMPL_HPP
#define FILESYSTEMMANAGERIMPL_HPP

#include "FileSystemManager.hpp"
#include "models/Folder.hpp"

class FileSystemManagerImpl : public FileSystemManager {
private:
    Folder root;
public:
    FileSystemManagerImpl(const std::string &rootName);

    void addFileOrFolder(const std::string &parentFolderName, const std::string &name, bool isFolder) override;

    void moveFileOrFolder(const std::string &sourceName, const std::string &destinationFolderName) override;

    std::vector<std::string> listContents(const std::string &folderName) const override;

    std::vector<std::string> listDirectoryStructure() const override;

    std::string searchFileExactMatch(const std::string &folderName, const std::string &fileName) const override;

    std::vector<std::string>
    searchFileLikeMatch(const std::string &folderName, const std::string &pattern) const override;
};

#endif