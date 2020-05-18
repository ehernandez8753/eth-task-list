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

    it('creates tasks', async() => {
        const result = await this.todoList.createTask('Mocha Unit Test Task')
        const taskCount = await this.todoList.taskCount()
        assert.equal(taskCount, 2)
        const event = result.logs[0].args   
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.content, 'Mocha Unit Test Task')
        assert.equal(event.completed, false)
    })

    it('toggles task completion', async() => {
        const result = await this.todoList.toggleCompleted(1)
        const task = await this.todoList.tasks(1)
        assert.equal(task.completed, true)
        const event = result.logs[0].args   
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
    })
})