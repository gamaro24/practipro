import React from "react";
import { UserState } from "../context/User/UserState";
import { RegisterState } from "./Register/RegisterState";
import { UniversityState } from "./University/UniversityState";
import { CarrerState } from "./Carrer/CarrerState";
import { InstitutionState } from "./Institution/InstitutionState";
import { HourState } from "./Hour/HourState";
import { AssistState } from "./Assist/AssistState";
import { CycleState } from "./Cycle/CycleState";
import { EvaluationState } from "./Evaluation/EvaluationState";
import { NotebookState } from "./Notebook/NotebookState";

export const StateContext = ({ children }) => {
  return (
    <RegisterState>
      <UserState>
        <UniversityState>
          <CarrerState>
            <InstitutionState>
              <HourState>
                <AssistState>
                  <CycleState>
                    <EvaluationState>
                      <NotebookState>
                        {children}
                      </NotebookState>
                    </EvaluationState>
                  </CycleState>
                </AssistState>
              </HourState>
            </InstitutionState>
          </CarrerState>
        </UniversityState>
      </UserState>
    </RegisterState>
  );
};
