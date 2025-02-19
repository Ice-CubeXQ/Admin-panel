import React from "react";

const Panel = () => {
  return (
    <div className="panel">
      <button uk-toggle="target: #modal-open" className="uk-button uk-button-primary uk-margin-small-right">
        Открыть
      </button>
      <button uk-toggle="target: #modal-save" className="uk-button uk-button-primary uk-margin-small-right">
        Опубликовать
      </button>
      <button uk-toggle="target: #modal-meta" className="uk-button uk-button-primary uk-margin-small-right">
        Редактировать META
      </button>
      <button uk-toggle="target: #modal-backup" className="uk-button uk-button-default">
        Восстановить
      </button>
    </div>
  );
};
export default Panel;
