import React, { useState, useContext, useEffect } from "react";
import "./notebook.css";

import { useNavigate } from "react-router-dom";
import { getDataUserByKey } from "../../helpers/helpers";
import { NotebookContext } from "../../context/Notebook/NotebookContext";
import exportTableToPDF from "../../helpers/helpers";

const Notebook = () => {
  const navigate = useNavigate();

  const initialFilters = {
    userId: getDataUserByKey("id"),
  };

  const { notebookState, getNotebook } = useContext(NotebookContext);
  const { notebook } = notebookState;

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    getNotebook(filters);
  }, []);

  return (
    <>
      <div id="exportContent">
        <h1 className="text-center">Registro de Evaluaciones</h1>
        <h2 className="text-center">Resumen de Calificaciones por Ciclo</h2>

        <div className="mb-3">
          <button onClick={() => exportTableToPDF("exportContent")} className="btn btn-primary">
            Exportar a PDF
          </button>
        </div>

        <div className="table-responsive">
        <table className="table table-bordered text-center" id="myTable">
    <thead>
        <tr>
            <th>ESCALA NUMÉRICA</th>
            {notebook.map((cycle) => (
                <th key={cycle.id}>
                    Ciclo {cycle.numberCycle} <br /> NOTA FINAL
                </th>
            ))}
        </tr>
    </thead>
    <tbody>
        {notebook.length > 0 &&
            notebook[0].evaluations.map((evaluation, index) => (
                <tr key={index}>
                    <td>{evaluation.criteria}</td>
                    {notebook.map((cycle) => {
                        const evalForCycle = cycle.evaluations.find(
                            (e) => e.criteria === evaluation.criteria
                        );
                        return <td key={cycle.id}>{evalForCycle?.note ?? ""}</td>;
                    })}
                </tr>
            ))}
    </tbody>
</table>
        </div>
      </div>
    </>
  );
};

export default Notebook;
