import CursosUnifiedSection from "./CursosUnifiedSection";

export default function CursosList({ cursos }) {
  const normalized = (cursos || [])
    .filter((curso) => curso.ativo !== false)
    .map((curso) => ({
      ...curso,
      vagasDisponiveis: Number(curso.vagasDisponiveis ?? curso.vagas ?? 0),
      requisitos: curso.requisitos || [],
    }));

  return <CursosUnifiedSection cursos={normalized} loading={false} />;
}