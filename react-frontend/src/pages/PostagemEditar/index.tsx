import React, { useState, useEffect, ChangeEvent } from 'react';
import {Button, Form } from 'react-bootstrap'
import api from '../../services/api'
import { useHistory, useParams } from 'react-router-dom'


interface Postagens {
  id?: number,
  title: string,
  body: string
}
const Postagemcriar: React.FC = () => {
  

  const history = useHistory()
  const { id } = useParams<{ id: string }>();

  
  const [model, setModel] = useState<Postagens>({
    title: '',
    body: ''
  })

  useEffect(() => {
    find( parseInt(id))
  }, [id])

  function atualizarModel(e: ChangeEvent<HTMLInputElement>){
    setModel({
      ...model,
      [e.target.name]: e.target.value
    })
  }


  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault()
    const response = await api.put(`/${parseInt(id)}`, model)
    voltar()
    console.log(response)

  }

  

  function voltar(){
    history.push('/postagens')
  }

  async function find(id: number){
    const response = await api.get(`/${id}`)
    setModel({ 
      title: response.data.data.title,
      body: response.data.data.body
    })
  }




  return (
    <div className="container">
      <br/>
      <div className="task-header">
        <h3 className="text-center" > Editar a publicação</h3>
        <Button size="sm" variant="dark" onClick={voltar} >Voltar</Button>
      </div>
      <br/>
      <div className="container">
      <Form onSubmit={onSubmit} >
        <Form.Group >
          <Form.Label>Título</Form.Label>
          <Form.Control 
            type="text" 
            name="title" 
            value={model.title}
            onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarModel(e)} 
            placeholder="digite o titulo" />
        </Form.Group>

        <Form.Group >
          <Form.Label>Corpo</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={10} 
            name="body"
            value={model.body}
            onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarModel(e)} 
          />
        </Form.Group>

        <Button variant="dark" type="submit">
          Enviar
        </Button>
      </Form>
      </div>
    </div>
  );
}

export default Postagemcriar;