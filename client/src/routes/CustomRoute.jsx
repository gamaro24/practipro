import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Logout from "../components/Logout/Logout";
import Users from "../components/Users/Users";

import Start from "../components/Start/Start";
import PrivateRoute from "../routes/PrivateRoute";
import { allowStudent, allowAllUsers, allowProfessorAndAdmin, allowAdmin, allowProfessorAndSupervisor, allowHigherStatus } from "../helpers/helpers";
import Universities from "../components/Universities/Universities";
import UniversitiesForm from "../components/Universities/UniversitiesForm"
import UserForm from "../components/Users/UserForm";
import Carrers from "../components/Carrers/Carrers";
import CarrersForm from "../components/Carrers/CarrersForm";
import Institutions from "../components/Institutions/Institutions";
import InstitutionsForm from "../components/Institutions/InstitutionsForm";
import Hours from "../components/Hours/Hours";
import HoursForm from "../components/Hours/HoursForm";
import Assists from "../components/Assists/Assists";
import Cycles from "../components/Cycles/Cycles";
import Evaluations from "../components/Evaluations/Evaluations";
import EvaluationsForm from "../components/Evaluations/EvaluationsForm";
import Profile from "../components/Profile/Profile";
import Notebook from "../components/Notebook/Notebook";
import QR from "../components/QR/QR";


const CustomRoute = () => (
  <>
    <Routes>
      <Route
        path="/"
        element={
          <Home>
            <Start />
          </Home>
        }

      />
      <Route
        path="login"
        element={
          <Home>
            <Login />
          </Home>
        }
      />

      <Route
        path="logout"
        element={
          <Home>
            <Logout />
          </Home>
        }
      />

      <Route
        path="user/create"
        element={
          <Home>
            <UserForm />
          </Home>
        }
      />

      <Route
        path="user/edit/:id"
        element={
          <Home>
            <UserForm />
          </Home>
        }
      />

      <Route
        path="universities"
        element={
          <PrivateRoute role={allowAdmin}>
            <Universities />
          </PrivateRoute>
        }
      />

      <Route
        path="university/create"
        element={
          <PrivateRoute role={allowAdmin}>
            <UniversitiesForm />
          </PrivateRoute>
        }
      />

      <Route
        path="university/edit/:id"
        element={
          <PrivateRoute role={allowAdmin}>
            <UniversitiesForm />
          </PrivateRoute>
        }
      />

      <Route
        path="institutions"
        element={
          <PrivateRoute role={allowAllUsers}>
            <Institutions />
          </PrivateRoute>
        }
      />

      <Route
        path="institution/create"
        element={
          <PrivateRoute role={allowAdmin}>
            <InstitutionsForm />
          </PrivateRoute>
        }
      />

      <Route
        path="institution/edit/:id"
        element={
          <PrivateRoute role={allowAdmin}>
            <InstitutionsForm />
          </PrivateRoute>
        }
      />

      <Route
        path="carrers"
        element={
          <PrivateRoute role={allowAdmin}>
            <Carrers />
          </PrivateRoute>
        }
      />

      <Route
        path="carrer/create"
        element={
          <PrivateRoute role={allowAdmin}>
            <CarrersForm />
          </PrivateRoute>
        }
      />

      <Route
        path="carrer/edit/:id"
        element={
          <PrivateRoute role={allowAdmin}>
            <CarrersForm />
          </PrivateRoute>
        }
      />

      <Route
        path="hours/:id"
        element={
          <PrivateRoute role={allowAllUsers}>
            <Hours />
          </PrivateRoute>
        }
      />

      <Route
        path="hour/create/:id"
        element={
          <PrivateRoute role={allowAdmin}>
            <HoursForm />
          </PrivateRoute>
        }
      />

      <Route
        path="hour/edit/:id"
        element={
          <PrivateRoute role={allowAdmin}>
            <HoursForm />
          </PrivateRoute>
        }
      />

      <Route
        path="assist"
        element={
          <PrivateRoute role={allowAllUsers}>
            <Assists />
          </PrivateRoute>
        }
      />

      <Route
        path="users"
        element={
          <PrivateRoute role={allowHigherStatus}>
            <Users />
          </PrivateRoute>
        }
      />

      <Route
        path="cycles/:id"
        element={
          <PrivateRoute role={allowProfessorAndSupervisor}>
            <Cycles />
          </PrivateRoute>
        }
      />

      <Route
        path="evaluations/:id"
        element={
          <PrivateRoute role={allowProfessorAndSupervisor}>
            <Evaluations />
          </PrivateRoute>
        }
      />
      <Route
        path="evaluations/edit/:id"
        element={
          <PrivateRoute role={allowProfessorAndSupervisor}>
            <EvaluationsForm />
          </PrivateRoute>
        }
      />
      <Route
        path="profile"
        element={
          <PrivateRoute role={allowAllUsers}>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="notebook"
        element={
          <PrivateRoute role={allowStudent}>
            <Notebook />
          </PrivateRoute>
        }
      />
      <Route
        path="qr/:institutionId"
        element={
          <Home>
            <Login />
          </Home>
        }
      />
    </Routes>
  </>
);

export default CustomRoute;
