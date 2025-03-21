import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { alertError } from "../../helpers/alerts";
import "./notebook.css";

import { useNavigate, useParams } from "react-router-dom";
import { getDataUserByKey } from "../../helpers/helpers";
import { NotebookContext } from '../../context/Notebook/NotebookContext';
import {NotebookList} from './NotebookList';
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
        <div><button onClick={exportTableToPDF}>Exportar a PDF</button></div>
        <div style={{ overflowX: "auto" }}>
            <table className="table border border-black text-center" id = 'myTable'>
                <thead>
                    <tr className="bg-gray-200 border border-black">
                        <th className="border border-black p-2" rowSpan={1}>
                            ESCALA NUMÉRICA
                        </th>
                        {/* Generate headers for each cycle dynamically */}
                        {notebook.map((cycle) => (
                            <th key={cycle.id} className="border border-black p-2">
                                Ciclo {cycle.numberCycle} <br /> NOTA FINAL
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Extract unique criteria from all cycles to create rows */}
                    {notebook.length > 0 && 
                        notebook[0].evaluations.map((evaluation, index) => (
                            <tr key={index} className="border border-black">
                                <td className="border border-black p-2 bg-blue-200 font-semibold">
                                    {evaluation.criteria}
                                </td>
                                {/* Populate notes per cycle dynamically */}
                                {notebook.map((cycle) => {
                                    const evalForCycle = cycle.evaluations.find(e => e.criteria === evaluation.criteria);
                                    return (
                                        <td key={cycle.id} className="border border-black p-2">
                                            {evalForCycle?.note ?? ""}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default Notebook;