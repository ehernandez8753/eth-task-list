pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    //Associative array/hash where key-value pair is stored
    //Data type for key (uint) for the Task
    //Similar to a database, key is a db entries ID, now we can track tasks in "Database"-form
    mapping(uint => Task) public tasks;

    //Called when contract is called for the first time
    constructor() public {
        createTask("Test content initial task");
    }

    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }

}
