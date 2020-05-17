const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts) => {
    //Get deployed copy of smart contract with before hook
    //Before each test runs we pass in an async function, we'll have a copy of todo lists
    before(async () => {
        this.todoList = await TodoList.deployed()
    })

    it('deploys successfully', async () => {
        //Make sure that address is not empty
        const address = await this.todoList.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('lists tasks', async() => {
        const taskCount = await this.todoList.taskCount()
        const task = await this.todoList.tasks(taskCount)
        assert.equal(task.id.toNumber(), taskCount.toNumber())
    })
})