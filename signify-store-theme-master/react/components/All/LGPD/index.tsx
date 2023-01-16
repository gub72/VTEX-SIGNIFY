import React, { useState, useEffect } from "react";
import { Button } from "vtex.styleguide";

import { schema } from "./schema";
type Props = {
  name: string;
};

import "./global.css";

export const LGPD = ({ name }: Props) => {
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    function getSessionStore() {
      if (!!sessionStorage.getItem("@storage/lgpd") == false) {
        sessionStorage.setItem("@storage/lgpd", "false");
        setDisplay(true);
      } else if (sessionStorage.getItem("@storage/lgpd") == "accept") {
        setDisplay(false);
      } else {
        setDisplay(true);
      }
    }

    getSessionStore();
  }, [display]);

  const closeLgpd = () => {
    setDisplay(false);
    sessionStorage.setItem("@storage/lgpd", "accept");
  };

  return (
    <div>
      {display && (
        <div className={`lgpd absolute fixed bottom-0 left-0 z-999 w-100`}>
          <div className="lgpd-container shadow-active w-100 bg-base tr pv5">
            <div className="flex lgpd-inner ph7">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 16.2C12.9765 16.2 16.2 12.9765 16.2 9C16.2 5.02355 12.9765 1.8 9 1.8C5.02355 1.8 1.8 5.02355 1.8 9C1.8 12.9765 5.02355 16.2 9 16.2ZM9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
                  fill="black"
                />
                <path
                  d="M7.64938 4.59818H9.99298L9.60238 10.3564H8.03998L7.64938 4.59818ZM8.82118 13.519C8.47678 13.519 8.18698 13.4098 7.95178 13.1914C7.72498 12.9646 7.61158 12.6916 7.61158 12.3724C7.61158 12.0532 7.72498 11.7886 7.95178 11.5786C8.17858 11.3602 8.46838 11.251 8.82118 11.251C9.17398 11.251 9.46378 11.3602 9.69058 11.5786C9.91738 11.7886 10.0308 12.0532 10.0308 12.3724C10.0308 12.6916 9.91318 12.9646 9.67798 13.1914C9.45118 13.4098 9.16558 13.519 8.82118 13.519Z"
                  fill="black"
                />
              </svg>
              <span className="lgpd-message">{name}</span>
              <div className="lgpd-button lgpd-button-ok">
                <Button variation="primary" onClick={closeLgpd}>
                  OK, Entendi
                </Button>
              </div>
              <div className="lgpd-button lgpd-button-close">
                <Button variation="tertiary" onClick={closeLgpd}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.05719 8.99997L0.528595 1.47137L1.4714 0.528564L9 8.05716L16.5286 0.528564L17.4714 1.47137L9.94281 8.99997L17.4714 16.5286L16.5286 17.4714L9 9.94278L1.4714 17.4714L0.528595 16.5286L8.05719 8.99997Z"
                      fill="black"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

LGPD.schema = schema;
