import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../contexts/ThemeContext";
import { FiMenu, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
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

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
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
  display: flex;
  align-items: center;

  &:hover {
    background: ${(p) => p.theme.bgTertiary};
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  color: ${(p) => p.theme.text};
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${(p) => p.theme.textSecondary};
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Main = styled.div`
  flex: 1;
  padding: 32px;
  animation: ${fadeIn} 0.5s ease;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Container = styled.div`
  padding: 30px;
  animation: ${fadeIn} 0.3s ease;
`;

const Button = styled.button`
  background: ${(p) => p.theme.primary};
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 10px;

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
  background: ${(p) => p.theme.cardBg};
  border-radius: 10px;
  overflow: hidden;
`;

const Th = styled.th`
  padding: 12px;
  background: ${(p) => p.theme.bgTertiary};
  font-weight: 700;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${(p) => p.theme.border};
`;

const TipoTag = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 13px;

  background: ${(p) =>
    p.tipo === "superadmin"
      ? "#ff4d4d33"
      : p.tipo === "professor"
      ? "#4da6ff33"
      : "#66cc3333"};

  color: ${(p) =>
    p.tipo === "superadmin"
      ? "#d40000"
      : p.tipo === "professor"
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
  animation: ${fadeIn} 0.2s ease;
`;

const ModalBox = styled.div`
  background: ${(p) => p.theme.cardBg};
  padding: 25px;
  border-radius: 14px;
  width: 420px;
  animation: ${modalFade} 0.2s ease;
`;

const Label = styled.label`
  display: block;
  margin-top: 12px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 4px;
  border-radius: 8px;
  border: 1px solid #bbbbbb55;
  background: ${(p) => p.theme.input};
  color: ${(p) => p.theme.text};
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 4px;
  border-radius: 8px;
`;

const SubmitBtn = styled(Button)`
  width: 100%;
  margin-top: 15px;
`;

const CancelBtn = styled.button`
  width: 100%;
  padding: 10px;
  background: #999;
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
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const nav = useNavigate();

  const token = localStorage.getItem("futsal_token") || "";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  // =========================
  //       UI
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
                        <Td>
                          <TipoTag tipo={u.tipo}>{u.tipo}</TipoTag>
                        </Td>
                        <Td>{new Date(u.criado_em).toLocaleString("pt-BR")}</Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </TableWrapper>

            {/* === MODAL === */}
            {showCreateModal && (
              <ModalBg>
                <ModalBox>
                  <h2>Criar Usuário</h2>

                  <form onSubmit={handleCreateUser}>
                    <Label>Nome</Label>
                    <Input
                      value={createData.nome}
                      onChange={(e) =>
                        setCreateData({ ...createData, nome: e.target.value })
                      }
                    />

                    <Label>Email</Label>
                    <Input
                      value={createData.email}
                      onChange={(e) =>
                        setCreateData({ ...createData, email: e.target.value })
                      }
                    />

                    <Label>Senha</Label>
                    <Input
                      type="password"
                      value={createData.senha}
                      onChange={(e) =>
                        setCreateData({ ...createData, senha: e.target.value })
                      }
                    />

                    <Label>Tipo</Label>
                    <Select
                      value={createData.tipo}
                      onChange={(e) =>
                        setCreateData({ ...createData, tipo: e.target.value })
                      }
                    >
                      <option value="aluno">Aluno</option>
                      <option value="professor">Professor</option>
                      <option value="superadmin">Super Admin</option>
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
        </Main>
      </Content>
    </Wrap>
  );
}
