// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import gqlLogo from './assets/gql.svg'
import './App.css'

import { useQuery, gql, useMutation } from "@apollo/client";

function App() {

  // Define query
  const TODOS_QUERY = gql`
    {todos {id title createdAt }}
  `;
  const { data } = useQuery(TODOS_QUERY);

  // Define mutation
  const REMOVE_TODO = gql`
    mutation RemoveATodo($input: Int!){
      removeTodo(id: $input){
        id
        title
      }
    }
  `;
  const [mutateFunction] = useMutation(REMOVE_TODO);

  // remove todo handler
  const removeHandler = id => {
    mutateFunction(
      {
        variables: { input: parseInt(id) },
        refetchQueries: [ { query: TODOS_QUERY }]
      }
    )
    .then(res => {
      if (res && res.data && res.data.removeTodo && res.data.removeTodo.id === id) {
        // say we want to display a message that a todo was removed
        console.log("Todo removed");
      }
    });
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://graphql.org" target="_blank" rel="noreferrer">
          <img src={gqlLogo} className="logo" alt="GraphQL logo" />
        </a>
      </div>

      <h1>React + GraphQL</h1>  
    
      <h2>Todo List</h2>
      {
        data && data.todos && data.todos.map((i) => (
          <div
            className={"todo"}
            key={i.id}
          >
            <span>
              {i.id} - {i.title}
            </span>
            <button
              onClick={() => removeHandler(i.id)}
            >
              Delete
            </button>
          </div>
        ))
      }

    </>
  )
}

export default App
