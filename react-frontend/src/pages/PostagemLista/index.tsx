import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import {Button, Table } from 'react-bootstrap'
import api from '../../services/api'

const PostagemLista: React.FC = () => {

  interface Postagens {
    id: number,
    title: string,
    body: string
    updated_at?: string
  }

  const [post, setPost] = useState<Postagens[]>([])
  const history = useHistory()

  useEffect(() =>{
    loadPost()
  }, [])

  async function loadPost() {
    const response = await api.get('/')
    const results = response.data.data
    for(let i=0; i < (results.length); i++){
      var dataAno = results[i].updated_at.slice(0,4)
      var dataMes = results[i].updated_at.slice(5,7)
      var dataDia = results[i].updated_at.slice(8,10)


      var horaCortada = results[i].updated_at.slice(11,19)

      var dataHoraCortada = dataDia+'/'+dataMes+'/'+dataAno+' - '+horaCortada
      
      results[i].updated_at = dataHoraCortada
    }
    
    setPost(results)
  }

  async function remover(id: number){
    await api.delete(`/${id}`)
    loadPost()
  }

  function newPost(){
    history.push('/criar')
  }
  function editPost(id: number){
    history.push(`/editar/${id}`)
  }
  function VisuPost(id: number){
    history.push(`/visualizar/${id}`)
  }



  return (
    <div className="container">
      <br/>
      <div className="task-header">
        <h1 className="text-center" >Postagens</h1>
        <Button size="sm" variant="dark" onClick={newPost} >Criar postagem</Button>
      </div>
      
      <br/>
      <Table striped bordered hover >
        <thead className="text-center">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Data de Atualização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            post.map(i => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.title}</td>
                <td className="text-center" >{i.updated_at}</td>
                <td className="text-center" >
                  <Button size="sm" onClick={() => editPost(i.id)}  >Editar</Button>{' '}
                  <Button size="sm" variant="info" onClick={() => VisuPost(i.id)} >Visualizar</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => remover(i.id)}>Deletar</Button>
                </td>
              </tr>
            ))
          }
          
        </tbody>
      </Table>

    </div>
  );
}

export default PostagemLista;