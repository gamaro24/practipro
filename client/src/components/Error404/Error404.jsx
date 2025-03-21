import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
export const Error404 = () => {
  
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
          }, "5000");
      }, []);
  
    return (
    <div>No tiene permisos</div>

  )
}
