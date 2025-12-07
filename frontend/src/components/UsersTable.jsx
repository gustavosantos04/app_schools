import React, { useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { FiEdit2, FiTrash2, FiUsers, FiSearch } from "react-icons/fi";
import * as XLSX from "xlsx";
import { FiDownload } from "react-icons/fi";

// =============================
// ANIMAÇÕES
// =============================
const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// =============================
// ESTILOS
// =============================
const TableWrapper = styled.div`
  animation: ${fade} 0.28s ease;
  background: ${({ theme }) => theme.cardBg};
  padding: 26px;
  border-radius: 18px;
  backdrop-filter: blur(14px);
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    opacity: 0.7;
  }
`;

// ---------- FILTROS ----------
const Filters = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 22px;
  align-items: center;
`;

const Input = styled.div`
  position: relative;
  flex: 1;

  input {
    width: 100%;
    padding: 12px 16px 12px 46px;
    border-radius: 14px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.cardBg};
    color: ${({ theme }) => theme.text};
    font-size: 0.95rem;
    transition: 0.25s ease;
    backdrop-filter: blur(12px);

    &:focus {
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    opacity: 0.5;
  }
`;

const Select = styled.select`
  width: 210px;
  padding: 12px 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(12px);
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  transition: 0.25s ease;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
  }
`;

// ---------- TABELA ----------
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 14px 10px;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  border-bottom: 1px solid ${({ theme }) => theme.borderLight};
`;

const Tr = styled.tr`
  animation: ${slideUp} 0.26s ease;
`;

const Td = styled.td`
  padding: 16px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.borderLight};
  color: ${({ theme }) => theme.text};

  &:last-child {
    text-align: right;
  }
`;

const RoleTag = styled.span`
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;

  ${({ type, theme }) => {
    switch (type) {
      case "superadmin":
        return `background: ${theme.primary}22; color: ${theme.primary};`;
      case "professor":
        return `background: #8b5cf633; color: #8b5cf6;`;
      default:
        return `background: #10b98133; color: #10b981;`;
    }
  }}
`;

// ---------- BOTÕES ----------
const ActionBtn = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: 0.2s ease;

  svg {
    color: white !important;
  }

  &:hover {
    filter: brightness(0.92);
    transform: translateY(-2px);
  }
`;

const DeleteBtn = styled.button`
  background: #d64545;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: 0.2s ease;

  &:hover {
    filter: brightness(0.85);
    transform: translateY(-2px);
  }
`;

// ---------- EMPTY ----------
const Empty = styled.div`
  padding: 36px 0;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
  animation: ${fade} 0.3s ease;
`;

// ---------- PAGINAÇÃO ----------
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 18px;
  gap: 10px;
`;

const PageBtn = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: ${({ active, theme }) =>
    active ? theme.primary : theme.inputBg};
  color: ${({ active, theme }) => (active ? "white" : theme.text)};
  cursor: pointer;
  font-weight: 600;

  &:hover {
    filter: brightness(0.9);
  }
`;

// =============================
// EXPORTAR EXCEL
// =============================

const ExportButton = styled.button`
  padding: 10px 18px;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    filter: brightness(0.9);
    transform: translateY(-2px);
  }
`;

// =============================
// COMPONENTE FINAL
// =============================
export default function UsersTable({ users, loading, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // FILTROS
  const filtered = useMemo(() => {
    return users
      .filter((u) =>
        u.nome.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      )
      .filter((u) =>
        filterTipo ? u.tipo === filterTipo : true
      );
  }, [users, search, filterTipo]);

  // EXPORTAR EXCEL
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuários");

    XLSX.writeFile(workbook, "usuarios.xlsx");
  };

  // PAGINAÇÃO
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <TableWrapper>
      <Header>
        <Title>
          <FiUsers size={22} /> Usuários
        </Title>
        <ExportButton onClick={exportToExcel}>
          <FiDownload size={18} />
          Exportar Excel
        </ExportButton>
      </Header>

      {/* FILTROS */}
      <Filters>
        <Input>
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Input>

        <Select
          value={filterTipo}
          onChange={(e) => {
            setFilterTipo(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Todos os tipos</option>
          <option value="superadmin">Super Admin</option>
          <option value="professor">Professor</option>
          <option value="aluno">Aluno</option>
        </Select>
      </Filters>

      {/* TABELA */}
      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Tipo</Th>
            <Th>Ações</Th>
          </tr>
        </thead>

        <tbody>
          {loading &&
            [...Array(4)].map((_, i) => (
              <Tr key={i}>
                <Td colSpan={4}>
                  <Empty>Carregando...</Empty>
                </Td>
              </Tr>
            ))}

          {!loading && paginated.length === 0 && (
            <tr>
              <Td colSpan={4}>
                <Empty>Nenhum usuário encontrado.</Empty>
              </Td>
            </tr>
          )}

          {!loading &&
            paginated.map((u) => (
              <Tr key={u.id}>
                <Td>{u.nome}</Td>
                <Td>{u.email}</Td>
                <Td>
                  <RoleTag type={u.tipo}>{u.tipo}</RoleTag>
                </Td>
                <Td>
                  <ActionBtn onClick={() => onEdit(u)}>
                    <FiEdit2 size={16} /> Editar
                  </ActionBtn>
                  &nbsp;
                  <DeleteBtn onClick={() => onDelete(u.id)}>
                    <FiTrash2 size={16} /> Excluir
                  </DeleteBtn>
                </Td>
              </Tr>
            ))}
        </tbody>
      </Table>

      {/* PAGINAÇÃO */}
      <Pagination>
        {[...Array(totalPages)].map((_, i) => (
          <PageBtn
            key={i}
            active={page === i + 1}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </PageBtn>
        ))}
      </Pagination>
    </TableWrapper>
  );
}
