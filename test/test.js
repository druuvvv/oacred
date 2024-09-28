const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const decache = require('decache');


let FileSystemManager = require('../file_system_manager');


describe('File system manager tests', function() {
	
	beforeEach(() => {
		decache("../file_system_manager");
		FileSystemManager = require("../file_system_manager");
	});

    it("Adding a file to existing folder", (done) => {
        const fileSystemManager = new FileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
        const contents = fileSystemManager.listContents("folder1");
        expect(contents.includes('file1.txt'), "adding a file to an existing folder").to.be.equal(true);
        done();
    })

    it("Adding a folder to existing folder", (done) => {
        const fileSystemManager = new FileSystemManager("root");
        fileSystemManager.addFileOrFolder("root", "folder1", true);
        fileSystemManager.addFileOrFolder("folder1", "subfolder1", true);
        const contents = fileSystemManager.listContents("folder1");
        expect(contents.includes('subfolder1'), "adding a folder to an existing folder").to.be.equal(true);
        done();
    })

	it("Adding a file to a non existing folder", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		fileSystemManager.addFileOrFolder("nonExistentFolder", "file1.txt", false);
		const contents = fileSystemManager.listContents("root");
		expect(contents.length, "adding a file to a non existing folder").to.be.equal(0);
        done();
	})

	it("Moving a file to a non existent folder", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		fileSystemManager.addFileOrFolder("root", "file1.txt", false);
		fileSystemManager.moveFileOrFolder("file1.txt", "nonExistentFolder");
		const contents = fileSystemManager.listContents("root");
		expect(contents.includes('file1.txt'), "moving a file/folder to a non existing folder").to.be.equal(true);
        done();
	})

	it("Moving a non existent file", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		fileSystemManager.addFileOrFolder("root", "folder1", true);
		fileSystemManager.moveFileOrFolder("nonExistentFile", "folder1");
		const contents = fileSystemManager.listContents("folder1");
		expect(contents.length, "moving a non existent file/folder").to.be.equal(0);
        done();
	})

	it("Listing contents of a folder", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		fileSystemManager.addFileOrFolder("root", "folder1", true);
		fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
		const contents = fileSystemManager.listContents("folder1");
		expect(contents.includes("file1.txt"), "listing contents of a folder").to.be.equal(true);
        done();
	})

	it("Moving a file", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		fileSystemManager.addFileOrFolder("root", "folder1", true);
		fileSystemManager.addFileOrFolder("folder1", "folder2", true);
		fileSystemManager.moveFileOrFolder("folder2", "root");
		const rootContents = fileSystemManager.listContents("root");
		const folder1Contents = fileSystemManager.listContents("folder1");
		expect(rootContents.includes("folder2"), "listing contents of destination").to.be.equal(true);
		expect(folder1Contents.length, "listing contents of source").to.be.equal(0);
        done();
	})

	it("Moving a file", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		fileSystemManager.addFileOrFolder("root", "folder1", true);
		fileSystemManager.addFileOrFolder("root", "folder2", true);
		fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
		fileSystemManager.moveFileOrFolder("file1.txt", "folder2");
		const contentsFolder1 = fileSystemManager.listContents("folder1");
		const contentsFolder2 = fileSystemManager.listContents("folder2");
		expect(contentsFolder1.length, "listing contents of folder 1").to.be.equal(0);
		expect(contentsFolder2.includes("file1.txt"), "listing contents of folder 2").to.be.equal(true);
		done();
	})


	it("Listing entire directory structure", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		fileSystemManager.addFileOrFolder("root", "folder1", true);
		fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
		const structure = fileSystemManager.listDirectoryStructure();
		expect(structure.includes("+ root"), "verifying structure").to.be.equal(true);
		expect(structure.includes("  + folder1"), "verifying structure").to.be.equal(true);
		expect(structure.includes("    - file1.txt"), "verifying structure").to.be.equal(true);
		done();
	})


	it("Search for a file with exact match", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		fileSystemManager.addFileOrFolder("root", "folder1", true);
		fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
		const result = fileSystemManager.searchFileExactMatch("folder1", "file1.txt");
		expect(result, "verifying exact match result").to.be.equal("file1.txt");
		done();
	})
	

	it("Search for a file with pattern match", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		fileSystemManager.addFileOrFolder("root", "folder1", true);
		fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
		fileSystemManager.addFileOrFolder("folder1", "file2.jpg", false);
		fileSystemManager.addFileOrFolder("folder1", "subfolder", true);
		fileSystemManager.addFileOrFolder("subfolder", "file3.txt", false);
		const searchResults = fileSystemManager.searchFileLikeMatch("root", ".txt");
		expect(searchResults.length, "verifying length of search results").to.be.equal(2);
		expect(searchResults.includes("file1.txt"), "verifying file1 in results").to.be.equal(true);
		expect(searchResults.includes("file3.txt"), "verifying file3 in results").to.be.equal(true);
		done();
	})

	it("Listing contents of a non existent folder", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		const contents = fileSystemManager.listContents("non_existent_folder");
		expect(contents.length, "verifying empty search result").to.be.equal(0);
		done();
	})

	it("Search for a file with a non existent pattern", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		fileSystemManager.addFileOrFolder("root", "folder1", true);
		fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
		const results = fileSystemManager.searchFileLikeMatch("folder1", "pattern");
		expect(results.length, "verifying empty search result").to.be.equal(0);
		done();
	})

	it("Search for a file in a non existent folder", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		const result = fileSystemManager.searchFileExactMatch("non_existent_folder", "file.txt");
		expect(result, "verifying nonexistent folder search").to.be.equal(null);
		done();
	})

	it("Handling of duplicate file or folder names within same parent folder", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		fileSystemManager.addFileOrFolder("root", "folder1", true);
		fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
		fileSystemManager.addFileOrFolder("folder1", "file1.txt", false);
		const contents = fileSystemManager.listContents("folder1");
		expect(contents.includes("file1.txt"), "verifying file1 to exist").to.be.equal(true);
		expect(contents.length, "verifying only 1 result").to.be.equal(1);
		done();
	})


	it("Handling of special characters in file and folder names", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		fileSystemManager.addFileOrFolder("root", "folder$#@!", true);
		fileSystemManager.addFileOrFolder("folder$#@!", "file%^&.txt", false);
		const contents = fileSystemManager.listContents("folder$#@!");
		expect(contents.includes("file%^&.txt"), "verifying file%^&.txt to exist").to.be.equal(true);
		done();
	})

	it("Listing with a large number of files and folders", (done) => {
		const fileSystemManager = new FileSystemManager("root");
		for (let i = 0; i < 1000; i++) {
			fileSystemManager.addFileOrFolder("root", "folder" + i, true);
			fileSystemManager.addFileOrFolder("folder" + i, "file" + i + ".txt", false);
		}
		const contents = fileSystemManager.listContents("folder500");
		expect(contents.includes("file500.txt"), "verifying file500 to be added to folder500").to.be.equal(true);
		done();
	})

	it("Case insensitivity in file and folder names during search", (done) => {
		const fileSystemManager = new FileSystemManager("Root");
		fileSystemManager.addFileOrFolder("Root", "Folder1", true);
		fileSystemManager.addFileOrFolder("Folder1", "file1.txt", false);
		fileSystemManager.addFileOrFolder("Folder1", "File2.TXT", false);
		fileSystemManager.addFileOrFolder("Folder1", "FOLDER2", true);

		const exactMatch = fileSystemManager.searchFileExactMatch("Folder1", "file1.txt");
		const likeMatchResults = fileSystemManager.searchFileLikeMatch("Folder1", "file");

		expect(exactMatch, "verifying file1.txt to be found").to.be.equal("file1.txt");
		expect(likeMatchResults.includes("file1.txt"), "verifying file1.txt to be matched").to.be.equal(true);
		expect(likeMatchResults.includes("File2.TXT"), "verifying File2.TXT to be matched").to.be.equal(true);
		expect(likeMatchResults.includes("FOLDER2"), "verifying file1.txt to be matched").to.be.equal(false);
		done();
	})

})