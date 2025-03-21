import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { EvaluationContext } from "../../context/Evaluation/EvaluationContext";

const EvaluationsForm = () => {

    const navigate = useNavigate();

    const { evaluationState, getEvaluationData, editEvaluation } = useContext(EvaluationContext);
    const { evaluationData } = evaluationState;

    const [evaluationRegister, setEvaluationRegister] = useState(evaluationData);

    const { id } = useParams();

    // Update variable onchange of data
    const handleChangeRegister = (e, name) => {
        if (e) {
            setEvaluationRegister({
                ...evaluationRegister,
                [e.target.name]: e.target.value,

            });
        } else {
            setEvaluationRegister({
                ...evaluationRegister,
                [name]: "",
            });
        }
    };

    // Validations for submit register to DB
    const handleSubmit = async (e) => {
        e.preventDefault();
            await editEvaluation(evaluationRegister);
            navigate(`/evaluations/${evaluationRegister?.cycleId}`);
    };

    useEffect(() => {
          getEvaluationData(id);
    }, []);

    useEffect(() => {
        setEvaluationRegister(evaluationData);
    }, [evaluationData]);

    return (
        <div className="login-view animate__animated animate__fadeInUp p-3">
            <div className="card card-register boxcard-register-responsive shadow ">
                <div className="form-signin text-center">
                    <div className="card-body">

                        <h3 className="card-title h3 mb-3 fw-normal">Editar Evaluación</h3>
                        <form onSubmit={handleSubmit}>

                            {/* CRITERIA */}

                            <div className="form-floating">
                                <input
                                    id="floatingCriteria"
                                    className="form-control"
                                    type="text"
                                    name="criteria"
                                    value={evaluationRegister?.criteria ?? ""}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                <label htmlFor="floatingCriteria">Descripción</label>
                            </div>

                            <div className="p-2"></div>

                            {/* NOTE */}

                            <div className="form-floating">
                                <input
                                    id="floatingCriteria"
                                    className="form-control"
                                    type="text"
                                    name="note"
                                    value={evaluationRegister?.note ?? ""}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                <label htmlFor="floatingCriteria">Nota</label>
                            </div>

                            <div className="p-2"></div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Editar Nota</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default EvaluationsForm;