import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../contexts/ThemeContext";
import { FiMenu, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import UserModal from "../components/UserModal";
import UsersTable from "../components/UsersTable";

// =========================
//    ANIMAÇÕES
// =========================
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// =========================
//       ESTILOS
// =========================
const Wrap = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${(p) => p.theme.bg};
  color: ${(p) => p.theme.text};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;

  @media (min-width: 769px) {
    margin-left: ${(p) => (p.$sidebarOpen ? "280px" : "0")};
  }
`;

const Header = styled.div`
  padding: 24px 32px;
  background: ${(p) => p.theme.cardBg};
  border-bottom: 1px solid ${(p) => p.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: ${(p) => p.theme.text};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${(p) => p.theme.textSecondary};
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  background: ${(p) => p.theme.primary};
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-left: 8px;

  &:hover {
    filter: brightness(0.9);
  }
`;

const Main = styled.div`
  flex: 1;
  padding: 32px;
  animation: ${fadeIn} 0.5s ease;
`;

const Container = styled.div`
  padding: 30px;
  animation: ${fadeIn} 0.3s ease;
`;

const TableWrapper = styled.div`
  margin-top: 20px;
  overflow-x: auto;
`;

// =========================
//       COMPONENTE
// =========================
export default function Users() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const nav = useNavigate();

  const token = localStorage.getItem("futsal_token") || "";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modal Create
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createData, setCreateData] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "aluno",
  });

  // Modal Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    nome: "",
    email: "",
    senha: "",
    tipo: "",
  });

  // =========================
  //   BUSCAR USUÁRIOS
  // =========================
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
      console.log("ERRO:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  //   ABRIR MODAL DE EDIÇÃO
  // =========================
  const handleEdit = (user) => {
    setEditData({
      id: user.id,
      nome: user.nome,
      email: user.email,
      senha: "",
      tipo: user.tipo,
    });
    setShowEditModal(true);
  };

  // =========================
  //   EXCLUIR USUÁRIO
  // =========================
  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
      const res = await fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.detail);
        return;
      }

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  //   CRIAR USUÁRIO
  // =========================
  const handleCreateUser = async (e) => {
    setLoading(true);

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
        setLoading(false);
        return;
      }

      setShowCreateModal(false);
      setCreateData({ nome: "", email: "", senha: "", tipo: "aluno" });
      fetchUsers();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // =========================
  //   EDITAR USUÁRIO
  // =========================
  const handleEditUser = async (e) => {
    setLoading(true);

    const payload = { ...editData };
    if (!payload.senha) delete payload.senha;

    try {
      const res = await fetch(
        `http://localhost:8000/users/${editData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        alert(error.detail);
        setLoading(false);
        return;
      }

      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // =========================
  //        LOGOUT
  // =========================
  const handleLogout = () => {
    logout();
    nav("/login");
  };

  // =========================
  //         UI
  // =========================
  return (
    <Wrap>
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        currentTab="users"
        setCurrentTab={() => {}}
        user={user}
      />

      <Content $sidebarOpen={sidebarOpen}>
        <Header>
          <HeaderLeft>
            <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FiMenu size={24} />
            </MenuButton>

            <HeaderTitle>
              <Title>Gerenciar Usuários</Title>
              <Subtitle>Lista completa de usuários cadastrados</Subtitle>
            </HeaderTitle>
          </HeaderLeft>

          <HeaderRight>
            <Button onClick={toggleTheme}>
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
              {theme === "dark" ? "Claro" : "Escuro"}
            </Button>

            <Button onClick={handleLogout}>
              <FiLogOut size={18} />
              Sair
            </Button>
          </HeaderRight>
        </Header>

        <Main>
          <Container>
            <Button onClick={fetchUsers}>Atualizar</Button>
            <Button onClick={() => setShowCreateModal(true)}>
              Criar Usuário
            </Button>

            <TableWrapper>
              <UsersTable
                users={users}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </TableWrapper>

            {/* CREATE MODAL */}
            <UserModal
              open={showCreateModal}
              onClose={() => setShowCreateModal(false)}
              onSubmit={handleCreateUser}
              data={createData}
              setData={setCreateData}
              mode="create"
              loading={loading}
            />

            {/* EDIT MODAL */}
            <UserModal
              open={showEditModal}
              onClose={() => setShowEditModal(false)}
              onSubmit={handleEditUser}
              data={editData}
              setData={setEditData}
              mode="edit"
              loading={loading}
            />
          </Container>
        </Main>
      </Content>
    </Wrap>
  );
}
