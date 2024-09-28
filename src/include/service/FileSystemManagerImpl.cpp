#include "FileSystemManagerImpl.hpp"
#include "models/Folder.hpp"

FileSystemManagerImpl::FileSystemManagerImpl(const std::string &rootName) : root(rootName) {}

void
FileSystemManagerImpl::addFileOrFolder(const std::string &parentFolderName, const std::string &name, bool isFolder) {
}

void FileSystemManagerImpl::moveFileOrFolder(const std::string &sourceName, const std::string &destinationFolderName) {
}

std::vector<std::string> FileSystemManagerImpl::listContents(const std::string &folderName) const {
    return {};
}

std::vector<std::string> FileSystemManagerImpl::listDirectoryStructure() const {
    return {};
}

std::string
FileSystemManagerImpl::searchFileExactMatch(const std::string &folderName, const std::string &fileName) const {
    return "";
}

std::vector<std::string>
FileSystemManagerImpl::searchFileLikeMatch(const std::string &folderName, const std::string &pattern) const {
    return {};
}