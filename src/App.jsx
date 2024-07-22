import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AuthPage from "./page/AuthPage";
import DraftCard from "./components/DraftCard";
import Navbar from "./components/Navbar";
import AdministrativePage from "./page/AdministrativePage";
import BudgetaryEstimate from "./page/BudgetaryEstimate";
import InprincipleApproval from "./page/InprincipleApproval"; 
import TccFinalNote from "./page/TccFinalNote";
import TccIntermediate from "./page/TccIntermediate"
import CreateNew from "./page/CreateNew";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import DraftPage from "./page/DraftPage";
import SavedDraft from "./page/SavedDraft";
import SignUp from "./components/SignUp";
import Sadap from "./page/Sadap";
import Sadbe from "./page/Sadbe";
import Sadtcci from "./page/Sadtcci";
import Sadtccfn from "./page/Sadtccfn";
import Sadipa from "./page/Sadipa";
import SDone from "./page/SDone";



const App = () => {


  const user = useRecoilValue(userAtom);

  return (
    <>
            
      <div className="w-full min-h-screen bg-zinc-100">
        {user ? <div><Navbar /></div> : ""}
        <Routes>
          <Route path='/' element={user ? <DraftPage /> : <Navigate to="/auth" />}   />
          <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/draft" element={<DraftPage />} />
          <Route path="/savedrafts/:userId" element={<SavedDraft />} />
          <Route path="/savedraft/:draftId" element={<SDone />} />
          <Route path="/Administrative Page/:draftId" element={<Sadap />} />
          <Route path="/Budgetary Estimate/:draftId" element={<Sadbe />} />
          <Route path="/TCC Intermediate/:draftId" element={<Sadtcci />} />
          <Route path="/TCC FinalNote/:draftId" element={<Sadtccfn />} />
          <Route path="/Inprinciple Approval/:draftId" element={<Sadipa />} />
          <Route path="/administrativepage" element={<AdministrativePage />} />
          <Route path="/budgetaryestimate" element={<BudgetaryEstimate />}  />
          <Route path="/inprincipleapproval" element={<InprincipleApproval />} />
          <Route path="/tccfinalnote" element={<TccFinalNote />} />
          <Route path="/tccintermediate" element={<TccIntermediate />} />
          <Route path="/createnew" element={<CreateNew />} />
        </Routes>

        <Routes>
          
        </Routes>
      </div>
    </>
  );
};

export default App;
