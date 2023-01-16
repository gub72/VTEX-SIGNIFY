import React from "react";
import { Helmet } from "vtex.render-runtime";

//Caso precise colocar algum script que não tenha app pixel é só adicionar a este arquivo

const HelmetComponent = () => {
  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, user-scalable=no" />
    </Helmet>
  );
};

export default HelmetComponent;
