import React, { Component, useEffect, useState } from 'react'
import Web3 from 'web3'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
import './App.css'

const App = () => {
  useEffect(() => {
  // Your code here
  loadBlockchainData()
  }, []);
  const [account ,setAccount] = useState('')
  const [todoListState ,setTodoList] = useState()
  const [tasks ,setTask] = useState([])
  const [taskCount ,setTaskCountAccount] = useState(0)
  const loadBlockchainData = async () =>  {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts)
      const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
      setTodoList(todoList)
      const taskCount = await todoList.methods.taskCount().call()
      setTaskCountAccount(taskCount)
      for (var i = 1; i <= taskCount; i++) {
        const task = await todoList.methods.tasks(i).call()
        setTask([...tasks, task])
      }
  }
  console.log(account);
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank">Dapp University | Todo List</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
              <div id="loader" className="text-center">
                <p className="text-center">Loading...</p>
              </div>
              <div id="content">
                <form>
                  <input id="newTask" type="text" className="form-control" placeholder="Add task..." required />
                  <input type="submit" hidden="" />
                </form>
                <ul id="taskList" className="list-unstyled">
                  { tasks.map((task, key) => {
                    return(
                      <div className="taskTemplate" className="checkbox" key={key}>
                        <label>
                          <input type="checkbox" />
                          <span className="content">{task.content}</span>
                        </label>
                      </div>
                    )
                  })}
                </ul>
                <ul id="completedTaskList" className="list-unstyled">
                </ul>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
}

export default App;
