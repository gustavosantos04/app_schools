import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// =========================
//       ANIMAÇÕES
// =========================

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const modalFade = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

// =========================
//       ESTILOS
// =========================

const Container = styled.div`
  padding: 30px;
  animation: ${fadeIn} .2s ease;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 10px;
  transition: 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

const TableWrapper = styled.div`
  margin-top: 20px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.card};
  border-radius: 10px;
  overflow: hidden;
`;

const Th = styled.th`
  padding: 12px;
  background: ${({ theme }) => theme.secondary};
  text-align: left;
  font-weight: 700;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dcdcdc33;
`;

const TipoTag = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 13px;

  background: ${({ tipo }) =>
    tipo === "superadmin"
      ? "#ff4d4d33"
      : tipo === "professor"
      ? "#4da6ff33"
      : "#66cc3333"};

  color: ${({ tipo }) =>
    tipo === "superadmin"
      ? "#d40000"
      : tipo === "professor"
      ? "#0066cc"
      : "#2e8b00"};
`;

const ModalBg = styled.div`
  position: fixed;
  inset: 0;
  background: #00000088;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} .2s ease;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 25px;
  border-radius: 14px;
  width: 420px;
  animation: ${modalFade} .2s ease;
`;

const Label = styled.label`
  display: block;
  margin-top: 12px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #bbbbbb55;
  margin-top: 4px;
  background: ${({ theme }) => theme.input};
  color: ${({ theme }) => theme.text};
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  margin-top: 4px;
  border: 1px solid #bbbbbb55;
`;

const SubmitBtn = styled(Button)`
  width: 100%;
  margin-top: 15px;
`;

const CancelBtn = styled.button`
  width: 100%;
  padding: 10px;
  background: #bbb;
  margin-top: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;


// =========================
//       COMPONENTE
// =========================

export default function Users() {
  const token = localStorage.getItem("futsal_token") || "";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [createData, setCreateData] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "aluno",
  });

  // =========================
  //   BUSCAR USUÁRIOS
  // =========================
  console.log("TOKEN ENVIADO:", token);
  const fetchUsers = async () => {
    if (!token) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log("Erro:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  //   CRIAR USUÁRIO
  // =========================
  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createData),
      });

      const response = await res.json();

      if (!res.ok) {
        alert("Erro: " + response.detail);
        return;
      }

      setShowCreateModal(false);
      setCreateData({ nome: "", email: "", senha: "", tipo: "aluno" });
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  //     UI
  // =========================

  return (
    <Container>
      <Title>Usuários</Title>

      <Button onClick={fetchUsers}>Atualizar</Button>
      <Button onClick={() => setShowCreateModal(true)}>Criar Usuário</Button>

      <TableWrapper>
        {loading ? (
          <p style={{ marginTop: 20 }}>Carregando...</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Tipo</Th>
                <Th>Criado em</Th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <Td>{u.nome}</Td>
                  <Td>{u.email}</Td>
                  <Td><TipoTag tipo={u.tipo}>{u.tipo}</TipoTag></Td>
                  <Td>{new Date(u.criado_em).toLocaleString("pt-BR")}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableWrapper>

      {/* MODAL */}
      {showCreateModal && (
        <ModalBg>
          <ModalBox>
            <h2 style={{ marginBottom: 10 }}>Criar Usuário</h2>

            <form onSubmit={handleCreateUser}>
              <Label>Nome:</Label>
              <Input
                type="text"
                value={createData.nome}
                onChange={(e) =>
                  setCreateData({ ...createData, nome: e.target.value })
                }
                required
              />

              <Label>Email:</Label>
              <Input
                type="email"
                value={createData.email}
                onChange={(e) =>
                  setCreateData({ ...createData, email: e.target.value })
                }
                required
              />

              <Label>Senha:</Label>
              <Input
                type="password"
                value={createData.senha}
                onChange={(e) =>
                  setCreateData({ ...createData, senha: e.target.value })
                }
                required
              />

              <Label>Tipo:</Label>
              <Select
                value={createData.tipo}
                onChange={(e) =>
                  setCreateData({ ...createData, tipo: e.target.value })
                }
              >
                <option value="aluno">Aluno</option>
                <option value="professor">Professor</option>
                <option value="superadmin">Superadmin</option>
              </Select>

              <SubmitBtn type="submit">Criar</SubmitBtn>
              <CancelBtn onClick={() => setShowCreateModal(false)}>
                Cancelar
              </CancelBtn>
            </form>
          </ModalBox>
        </ModalBg>
      )}
    </Container>
  );
}
