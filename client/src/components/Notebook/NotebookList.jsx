import React from "react";

export const NotebookList = ({ notebook }) => {
  return (
    <table className="table border border-black text-center">
      <thead>
        <tr className="bg-gray-200 border border-black">
          <th className="border border-black p-2" rowSpan={2}>ESCALA NUMÉRICA</th>
          {[...Array(6)].map((_, i) => (
            <th key={i} className="border border-black p-2">
              Rot. {i + 1} <br /> NOTA FINAL
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {notebook.evaluations.map((evaluation, index) => (
          <tr key={evaluation.id} className="border border-black">
            <td className="border border-black p-2 bg-blue-200 font-semibold">
              {evaluation.criteria}
            </td>
            {[...Array(6)].map((_, i) => (
              <td key={i} className="border border-black p-2">
                {i === 0 ? evaluation.note ?? "" : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NotebookList;
