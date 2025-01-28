import { useEffect, useState } from 'react';
import './admin.css';

import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import {
  addDoc, // adiciona um documento
  collection, // coleção
  onSnapshot, // escuta uma coleção
  query, // consulta
  orderBy,// ordena
  where, // filtra
  doc,
  deleteDoc,
  updateDoc
}
  from 'firebase/firestore';

const Admin = () => {
  const [tarefaInput, setTarefaInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [tarefas, setTarefas] = useState([]);
  const [edit, setEdit] = useState({});

  useEffect(() => {
    async function loadTarefas() {
      const userDatail = localStorage.getItem('@detailUser'); // pega os dados do localstorage
  
      if (userDatail) {
        const data = JSON.parse(userDatail);
        setUser(data); // transforma os dados em json
  
        const tarefasRef = collection(db, 'tarefas');
        const q = query(tarefasRef, orderBy('create', 'desc'), where('userUid', '==', data?.uid));
        const unsub = onSnapshot(q, (snapshot) => {
          let list = [];
          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })
  
          setTarefas(list);
        })
      } else {
        toast.error('Usuário não encontrado! Faça login.');
      }
    }
  
    loadTarefas();
  }, [])
  

  async function handleRegister(e) {
    e.preventDefault();

    if (tarefaInput === '') {
      toast.error('Preencha a tarefa!');
      return;
    }

    if (edit?.id) {
      handleUpdateTarefa();
      return;
    }

    await addDoc(collection(db, 'tarefas'), {
      tarefa: tarefaInput,
      create: new Date(),
      userUid: user?.uid // pega o uid do usuario
    })
      .then(() => {
        toast.success('Tarefa registrada com sucesso!');
        setTarefaInput('');
      })
      .catch((error) => {
        console.log("Erro ao registrar tarefa", error);
      })
  }

  async function handleLogoutConfirm() {
    await signOut(auth);
  }

  async function handleDelete(id) {
    const docRef = doc(db, 'tarefas', id);
    await deleteDoc(docRef);
    toast.dark('Tarefa concluída com sucesso!');
  }

  function editTarefa(item) {
    setTarefaInput(item.tarefa);
    setEdit(item);
  }

  async function handleUpdateTarefa() {
    toast.success('Tarefa atualizada com sucesso!');
    const docRef = doc(db, 'tarefas', edit.id);
    await updateDoc(docRef, {
      tarefa: tarefaInput
    })
      .then(() => {
        setTarefaInput('');
        setEdit({});
      })
      .catch((error) => {
        console.log("Erro ao atualizar tarefa", error);
        setTarefaInput('');
        setEdit({});
      })
  }

  return (
    <div className="admin-container">
      <h1>Minhas Tarefas</h1>

      <form onSubmit={handleRegister} className="form">
        <textarea
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />
        {Object.keys(edit).length > 0 ? (
          <button type="submit" style={{ backgroundColor: 'orange' }}>Atualizar tarefa</button>
        ) : (
          <button type="submit">Registrar tarefa</button>
        )}
      </form>

      {tarefas.map((item) => (
        <article className="list" key={item.id}>
          <p>{item.tarefa}</p>
          <div>
            <button onClick={() => editTarefa(item)} >editar</button>
            <button className="btn-delete" onClick={() => handleDelete(item.id)}>concluir</button>
          </div>
        </article>
      ))}

      <button className="btn-logout" onClick={() => setShowModal(true)}>Sair</button>

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmação</h2>
            <p>Deseja realmente sair?</p>
            <div className="modal-buttons">
              <button onClick={handleLogoutConfirm} className="btn-confirm">
                Sim
              </button>
              <button onClick={() => setShowModal(false)} className="btn-cancel">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
