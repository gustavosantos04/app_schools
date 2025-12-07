import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiX, FiUser, FiMail, FiLock, FiShield } from "react-icons/fi";

/* =============================
   ANIMAÇÕES
============================= */

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pop = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(.94); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin .6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

/* =============================
   ESTILOS PREMIUM
============================= */

const Bg = styled.div`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(14px);
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fade} .25s ease;
  z-index: 9999;
`;

const Box = styled.div`
  width: 470px;
  padding: 34px;

  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);

  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.18);

  box-shadow:
    0 12px 38px rgba(0,0,0,0.35),
    inset 0 0 60px rgba(255,255,255,0.05);

  animation: ${pop} .28s ease;
  position: relative;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.7rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  text-shadow: 0 2px 6px rgba(0,0,0,0.25);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.25);
  color: ${({ theme }) => theme.text};
  backdrop-filter: blur(10px);

  width: 38px;
  height: 38px;
  border-radius: 12px;
  cursor: pointer;
  transition: .2s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(255,255,255,0.25);
    transform: scale(1.07);
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  font-size: .95rem;
  letter-spacing: 0.2px;
`;

const InputGroup = styled.div`
  position: relative;
  margin-top: 6px;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textSecondary};
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px 12px 40px;
  
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.08);
  color: ${({ theme }) => theme.text};
  transition: .25s ease;
  backdrop-filter: blur(10px);

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    background: rgba(255,255,255,0.18);
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 13px 14px;
  margin-top: 6px;

  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.08);
  color: ${({ theme }) => theme.text};
  backdrop-filter: blur(10px);
  transition: .25s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    background: rgba(255,255,255,0.18);
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
  }

  option {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
  }
`;

const ErrorText = styled.p`
  font-size: .85rem;
  margin: 4px 0 0;
  color: #ff6b6b;
  font-weight: 600;
`;

const Submit = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 26px;

  border-radius: 12px;
  border: none;
  
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.primary}CC 100%
  );
  color: white;

  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: .2s ease;

  box-shadow: 0 6px 20px ${({ theme }) => theme.primary}55;

  &:hover {
    transform: translateY(-3px);
    filter: brightness(.95);
  }

  &:active {
    transform: translateY(0);
    filter: brightness(.85);
  }

  opacity: ${({ disabled }) => disabled ? 0.7 : 1};
  cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
`;

const Cancel = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 12px;

  border-radius: 12px;
  border: none;

  background: rgba(255,255,255,0.15);
  color: ${({ theme }) => theme.textSecondary};
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: .2s ease;

  &:hover {
    background: rgba(255,255,255,0.25);
    transform: translateY(-3px);
  }
`;

/* =============================
   COMPONENTE FINAL
============================= */

export default function UserModal({ open, onClose, onSubmit, data, setData, mode }) {
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  // ------------------------------
  // Validação em tempo real
  // ------------------------------
  const validate = (field, value) => {
    let err = "";

    if (field === "nome" && value.trim().length < 3) {
      err = "O nome deve ter ao menos 3 caracteres.";
    }

    if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
      err = "Email inválido.";
    }

    if (field === "senha" && mode === "create" && value.length < 6) {
      err = "A senha deve ter ao menos 6 caracteres.";
    }

    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Se qualquer erro existir, bloqueia submit
    if (errors.nome || errors.email || errors.senha) return;

    setLoading(true);

    try {
      await onSubmit(data);  // <--- USANDO O NOME CORRETO
    } finally {
      setLoading(false);
    }
  };
  
  if (!open) return null;

  return (
    <Bg>
      <Box>
        <CloseBtn onClick={onClose}>
          <FiX size={22} />
        </CloseBtn>

        <Title>{mode === "edit" ? "Editar Usuário" : "Criar Usuário"}</Title>

        <form onSubmit={handleSubmit}>

          {/* Nome */}
          <Label>Nome</Label>
          <InputGroup>
            <InputIcon><FiUser /></InputIcon>
            <Input
              value={data.nome}
              onChange={(e) => {
                setData({ ...data, nome: e.target.value });
                validate("nome", e.target.value);
              }}
            />
          </InputGroup>
          {errors.nome && <ErrorText>{errors.nome}</ErrorText>}

          {/* Email */}
          <Label>Email</Label>
          <InputGroup>
            <InputIcon><FiMail /></InputIcon>
            <Input
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
                validate("email", e.target.value);
              }}
            />
          </InputGroup>
          {errors.email && <ErrorText>{errors.email}</ErrorText>}

          {/* Senha */}
          <Label>Senha</Label>
          <InputGroup>
            <InputIcon><FiLock /></InputIcon>
            <Input
              type="password"
              placeholder={mode === "edit" ? "Deixe vazio para manter" : "Senha"}
              onChange={(e) => {
                setData({ ...data, senha: e.target.value });
                validate("senha", e.target.value);
              }}
            />
          </InputGroup>
          {errors.senha && <ErrorText>{errors.senha}</ErrorText>}

          {/* Tipo */}
          <Label>Tipo</Label>
          <InputGroup>
            <InputIcon><FiShield /></InputIcon>
            <Select
              value={data.tipo}
              onChange={(e) => setData({ ...data, tipo: e.target.value })}
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="superadmin">Super Admin</option>
            </Select>
          </InputGroup>

          {/* Submit */}
          <Submit disabled={loading}>
            {loading ? <Spinner /> : mode === "edit" ? "Salvar Alterações" : "Criar Usuário"}
          </Submit>

          <Cancel type="button" onClick={onClose}>
            Cancelar
          </Cancel>

        </form>
      </Box>
    </Bg>
  );
}
