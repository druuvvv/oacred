#define BOOST_TEST_MODULE file_system_manager_tests

#include <boost/test/unit_test.hpp>
#include "service/FileSystemManagerImpl.hpp"


BOOST_AUTO_TEST_SUITE(tests_suite)

    BOOST_AUTO_TEST_CASE(test_adding_file_to_existing_folder) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
        std::vector<std::string> contents = fileSystemManager.listContents("folder1");
        BOOST_CHECK(std::find(contents.begin(), contents.end(), "file1.txt") != contents.end());
    }

    BOOST_AUTO_TEST_CASE(test_adding_folder_to_existing_folder) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("folder1", "subfolder1", true);
        std::vector<std::string> contents = fileSystemManager.listContents("folder1");
        BOOST_CHECK(std::find(contents.begin(), contents.end(), "subfolder1") != contents.end());
    }


    BOOST_AUTO_TEST_CASE(test_adding_to_non_existent_parent_folder) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("nonExistentFolder", "file1.txt", false);
        std::vector<std::string> contents = fileSystemManager.listContents("root");
        BOOST_CHECK(std::find(contents.begin(), contents.end(), "file1.txt") == contents.end() && contents.size() == 1);
    }


    BOOST_AUTO_TEST_CASE(test_moving_to_non_existent_destination_folder) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "file1.txt", false);
        fileSystemManager.moveFileOrFolder("file1.txt", "nonExistentFolder");
        std::vector<std::string> contents = fileSystemManager.listContents("root");
        BOOST_CHECK(std::find(contents.begin(), contents.end(), "file1.txt") != contents.end());
    }


    BOOST_AUTO_TEST_CASE(test_moving_non_existent_file_or_folder) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.moveFileOrFolder("nonExistentFile", "folder1");
        std::vector<std::string> contents = fileSystemManager.listContents("folder1");
        std::vector<std::string> rootContents = fileSystemManager.listContents("root");
        BOOST_CHECK(std::find(contents.begin(), contents.end(), "nonExistentFile") == contents.end() &&
                    !rootContents.empty());
    }


    BOOST_AUTO_TEST_CASE(test_listing_contents_of_folder) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
        std::vector<std::string> contents = fileSystemManager.listContents("folder1");
        BOOST_CHECK(std::find(contents.begin(), contents.end(), "file1.txt") != contents.end());
    }


    BOOST_AUTO_TEST_CASE(test_move_folder_to_another_folder) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("folder1", "folder2", true);
        fileSystemManager.moveFileOrFolder("folder2", "root");
        std::vector<std::string> rootContents = fileSystemManager.listContents("root");
        std::vector<std::string> folder1Contents = fileSystemManager.listContents("folder1");
        BOOST_CHECK(std::find(rootContents.begin(), rootContents.end(), "folder2") != rootContents.end());
        BOOST_CHECK(std::find(folder1Contents.begin(), folder1Contents.end(), "folder2") == folder1Contents.end() &&
                    rootContents.size() == 2);
    }

    BOOST_AUTO_TEST_CASE(test_moving_file_to_another_folder) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("root", "folder2", true);
        fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
        fileSystemManager.moveFileOrFolder("file1.txt", "folder2");
        std::vector<std::string> contentsFolder1 = fileSystemManager.listContents("folder1");
        std::vector<std::string> contentsFolder2 = fileSystemManager.listContents("folder2");
        BOOST_CHECK(std::find(contentsFolder1.begin(), contentsFolder1.end(), "file1.txt") == contentsFolder1.end() &&
                    !contentsFolder2.empty());
        BOOST_CHECK(std::find(contentsFolder2.begin(), contentsFolder2.end(), "file1.txt") != contentsFolder2.end());
    }

    BOOST_AUTO_TEST_CASE(test_listing_entire_directory_structure) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
        std::vector<std::string> structure = fileSystemManager.listDirectoryStructure();
        BOOST_CHECK(std::find(structure.begin(), structure.end(), "+ root") != structure.end());
        BOOST_CHECK(std::find(structure.begin(), structure.end(), "  + folder1") != structure.end());
        BOOST_CHECK(std::find(structure.begin(), structure.end(), "    - file1.txt") != structure.end());
    }

    BOOST_AUTO_TEST_CASE(test_search_file_exact_match) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
        std::string result = fileSystemManager.searchFileExactMatch("folder1", "file1.txt");
        BOOST_CHECK_EQUAL("file1.txt", result);
    }


    BOOST_AUTO_TEST_CASE(test_search_file_like_match) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
        fileSystemManager.addFileOrFolder("folder1", "file2.jpg", false);
        fileSystemManager.addFileOrFolder("folder1", "subfolder", true);
        fileSystemManager.addFileOrFolder("subfolder", "file3.txt", false);

        std::vector<std::string> searchResults = fileSystemManager.searchFileLikeMatch("root", ".txt");
        BOOST_CHECK_EQUAL(2, searchResults.size());
        BOOST_CHECK(std::find(searchResults.begin(), searchResults.end(), "file1.txt") != searchResults.end());
        BOOST_CHECK(std::find(searchResults.begin(), searchResults.end(), "file3.txt") != searchResults.end());
    }


    BOOST_AUTO_TEST_CASE(test_listing_contents_of_non_existent_folder) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        std::vector<std::string> rootContents = fileSystemManager.listContents("root");
        std::vector<std::string> contents = fileSystemManager.listContents("non_existent_folder");
        BOOST_CHECK(contents.empty() && !rootContents.empty());
    }


    BOOST_AUTO_TEST_CASE(test_search_file_with_no_matching_pattern) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
        std::vector<std::string> rootContents = fileSystemManager.listContents("root");
        std::vector<std::string> results = fileSystemManager.searchFileLikeMatch("folder1", "pattern");
        BOOST_CHECK(results.empty() && !rootContents.empty());
    }

    BOOST_AUTO_TEST_CASE(test_searching_for_file_in_non_existent_folder) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        std::vector<std::string> rootContents = fileSystemManager.listContents("root");
        std::string result = fileSystemManager.searchFileExactMatch("non_existent_folder", "file.txt");
        BOOST_CHECK(result.empty() && !rootContents.empty());
    }


    BOOST_AUTO_TEST_CASE(test_handling_duplicate_names_within_parent_folder) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
        fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
        std::vector<std::string> contents = fileSystemManager.listContents("folder1");
        BOOST_CHECK_EQUAL(1, std::count(contents.begin(), contents.end(), "file1.txt"));
    }


    BOOST_AUTO_TEST_CASE(test_handling_special_characters_in_names) {
        FileSystemManagerImpl fileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder$#@!", true);
        fileSystemManager.addFileOrFolder("folder$#@!", "file%^&.txt", false);
        std::vector<std::string> contents = fileSystemManager.listContents("folder$#@!");
        BOOST_CHECK(std::find(contents.begin(), contents.end(), "file%^&.txt") != contents.end());
    }


    BOOST_AUTO_TEST_CASE(test_performance_large_number_of_files_and_folders) {
        FileSystemManagerImpl fileSystemManager("root");

        for (int i = 0; i < 1000; i++) {
            fileSystemManager.addFileOrFolder("root", "folder" + std::to_string(i), true);
            fileSystemManager.addFileOrFolder("folder" + std::to_string(i), "file" + std::to_string(i) + ".txt", false);
        }

        std::vector<std::string> contents = fileSystemManager.listContents("folder500");

        BOOST_CHECK(std::find(contents.begin(), contents.end(), "file500.txt") != contents.end());
    }


    BOOST_AUTO_TEST_CASE(test_case_sensitivity_search_operations) {
        FileSystemManagerImpl fileSystemManager("Root");

        fileSystemManager.addFileOrFolder("Root", "Folder1", true);
        fileSystemManager.addFileOrFolder("Folder1", "file1.txt", false);
        fileSystemManager.addFileOrFolder("Folder1", "File2.TXT", false);
        fileSystemManager.addFileOrFolder("Folder1", "FOLDER2", true);

        std::string exactMatch = fileSystemManager.searchFileExactMatch("Folder1", "file1.txt");
        std::vector<std::string> likeMatchResults = fileSystemManager.searchFileLikeMatch("Folder1", "file");

        BOOST_CHECK_EQUAL("file1.txt", exactMatch);
        BOOST_CHECK(std::find(likeMatchResults.begin(), likeMatchResults.end(), "file1.txt") != likeMatchResults.end());
        BOOST_CHECK(std::find(likeMatchResults.begin(), likeMatchResults.end(), "File2.TXT") != likeMatchResults.end());
        BOOST_CHECK(std::find(likeMatchResults.begin(), likeMatchResults.end(), "FOLDER2") == likeMatchResults.end() &&
                    !likeMatchResults.empty());
    }

BOOST_AUTO_TEST_SUITE_END()