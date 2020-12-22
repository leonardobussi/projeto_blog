import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import {Button } from 'react-bootstrap'
import api from '../../services/api'

const PostagemLista: React.FC = () => {

  interface Postagens {
    id?: number,
    title: string,
    body: string
    updated_at?: string
  }

  const history = useHistory()
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    find(id)
  }, [id])

  async function find(id: string) {
    const response = await api.get(`/${parseInt(id)}`)
    const results = response.data.data
    
    setModel(results)
  }

  function voltar(){
    history.push('/postagens')
  }
  const [model, setModel] = useState<Postagens>({
    title: '',
    body: ''
  })

  return (
    <div className="container">
      <br/>
      <div className="task-header">
        <h1 className="text-center" >Postagens</h1>
        <Button size="sm" variant="dark" onClick={voltar} >Voltar</Button>
      </div>
      
      <br/>
 
          {
            <div>
              <h3>{model.title}</h3>
              <span>{model.body}</span>
            </div>     
          }
      
    </div>
  );
}

export default PostagemLista;