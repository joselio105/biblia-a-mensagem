import { Heading } from "@/components/heading";
import { Paragraph } from "@/components/paragraph";
import { ScrollView, Text, View } from "react-native";

export default function About() {
  return (
    <ScrollView className="flex-1 bg-zinc-900">
      <Heading>Sobre o Projeto</Heading>
      <Paragraph>
        O projeto Bíblia A Mensagem Online nasceu durante a pandemia, com a
        visão de tornar a tradução contemporânea da Bíblia, “A Mensagem”,
        acessível digitalmente. Originado da necessidade da comunidade da igreja
        local do autor, onde as fontes desta tradução eram limitadas a formatos
        físicos e alguns aplicativos menos práticos, o projeto visava facilitar
        o acesso durante as pregações e estudos bíblicos.
      </Paragraph>

      <Heading type="h3">Início e Inspiração</Heading>
      <Paragraph>
        Iniciado no começo de 2021, o projeto utilizou Python para transformar
        um PDF extenso em um formato mais gerenciável, JSON, facilitando o
        acesso e a distribuição dos textos. A escolha do framework Next.js
        possibilitou uma abordagem fullstack, simplificando o desenvolvimento e
        hospedagem do site. Esta fase inicial foi marcada por um profundo
        aprendizado em padrões de expressões regulares e tratamento de dados.
      </Paragraph>

      <Heading type="h3">Desenvolvimento Técnico</Heading>
      <Heading type="h3">Crescimento e Impacto</Heading>
      <Heading type="h3">Compromisso com a Acessibilidade e Ética</Heading>
      <Heading type="h3">Conquistas</Heading>
      <Heading type="h3">Olhando para o Futuro</Heading>
      <Heading type="h3">Olhando para o Futuro</Heading>
    </ScrollView>
  );
}
