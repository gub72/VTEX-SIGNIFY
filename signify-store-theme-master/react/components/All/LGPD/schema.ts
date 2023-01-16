export const schema = {
  title: "LGPD",
  description: "LGPD",
  type: "object",
  properties: {
    name: {
      title: "Mensagem LGPD",
      description: "Mensagem que será exibida na home do site.",
      type: "string",
      default:
        "Para sua maior segurança, atualizamos as Políticas de Privacidade e Termos de Uso do site. Ao continuar navegando nele, entendemos que você está ciente e de acordo com elas.",
    },
  },
};
