import React, { useState, useEffect, ChangeEvent } from 'react';
import {Button, Form } from 'react-bootstrap'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'


interface Postagens {
  id?: number,
  title: string,
  body: string
}

const Postagemcriar: React.FC = () => {

  const history = useHistory()

  const [model, setModel] = useState<Postagens>({
    title: '',
    body: ''
  })

  function atualizarModel(e: ChangeEvent<HTMLInputElement>){
    setModel({
      ...model,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault()

    const response = await api.post('/', model)

    console.log(response)

  }

  

  function voltar(){
    history.push('/postagens')
  }




  return (
    <div className="container">
      <br/>
      <div className="task-header">
        <h3 className="text-center" > Registre novas postagens</h3>
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
            onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarModel(e)} 
            placeholder="digite o titulo" />
        </Form.Group>

        <Form.Group >
          <Form.Label>Corpo</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={10} 
            name="body"
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