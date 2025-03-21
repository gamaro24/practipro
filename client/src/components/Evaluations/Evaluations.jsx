import React, { useState, useContext, useEffect } from 'react';
import "../../App.css";
import "./evaluations.css";
import { EvaluationContext } from "../../context/Evaluation/EvaluationContext";
import { EvaluationsList } from './EvaluationsList';
import { useNavigate, useParams } from "react-router-dom";
import { PaginationCustom } from "../Pagination/Pagination";
import { getDataUserByKey } from "../../helpers/helpers";


const Evaluations = () => {

  const { id } = useParams();

  const initialFilters = {
    id: id,
  };

  const navigate = useNavigate();

  const { evaluationState, getEvaluationsFiltered } = useContext(EvaluationContext);
  const { evaluations, totalEvaluationsPages, evaluationsFiltered } = evaluationState;

  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  const [evaluation, setEvaluation] = useState({
    cycleId: "",
    criteria: "",
    note: "",
    observations: "",
  });

  useEffect(() => {
    getEvaluationsFiltered(page, filters);
  }, [page]);

  return (
    <>
      <div className="ms-3 me-3">
        <h2 className="text-center">Evaluaciones</h2>
        {
          evaluationsFiltered?.length > 0 ? (
            <>
              <div style={{ overflowX: "auto" }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Alumno</th>
                      <th>Descripción</th>
                      <th>Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluationsFiltered.map((evaluation) => (
                      <EvaluationsList
                        evaluation={evaluation}
                        key={evaluation.id}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-2"></div>

              <PaginationCustom
                currentPage={page}
                totalPages={totalEvaluationsPages}
                paginate={setPage}
              />
            </>
          ) : (
            <p className="text-center">No hay registros</p>
          )}
      </div>
    </>
  );

};

export default Evaluations;