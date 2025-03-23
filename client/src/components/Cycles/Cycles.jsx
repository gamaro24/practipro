import React, { useState, useContext, useEffect } from 'react';
import "./cycles.css";
import { CycleContext } from "../../context/Cycle/CycleContext";
import { CyclesList } from './CyclesList';
import { useNavigate, useParams } from "react-router-dom";
import { PaginationCustom } from "../Pagination/Pagination";


const Cycles = () => {

  const { id } = useParams();

  const initialFilters = {

    id: id,
  };

  const navigate = useNavigate();

  const { cycleState, getCyclesFiltered } = useContext(CycleContext);
  const { cycles, totalCyclesPages, cyclesFiltered } = cycleState;

  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  const [cycle, setCycle] = useState({
    userId: "",
    carrerId: "",
    institutionId: "",
    observations: "",
  });

  useEffect(() => {
    getCyclesFiltered(page, filters);
  }, [page]);

  return (
    <>
      <div className="ms-3 me-3">
        <h2 className="text-center">Listado de Rotaciones</h2>
        {
          cyclesFiltered?.length > 0 ? (
            <>
              <div style={{ overflowX: "auto" }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Rotacion</th>
                      <th>Instituto</th>
                      <th>Carrera</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cyclesFiltered.map((cycle) => (
                      <CyclesList
                        cycle={cycle}
                        key={cycle.id}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-2"></div>

              <PaginationCustom
                currentPage={page}
                totalPages={totalCyclesPages}
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

export default Cycles;