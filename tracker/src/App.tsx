import "./App.css";

import Home from "./pages/Home";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DialogComp } from "./components/Dialog/DialogComp";

function App() {
  return (
    <SidebarProvider className='w-full'>
      <AppSidebar />
      <div className='flex flex-col p-2 w-full'>
        <div className='flex  w-full'>
          <SidebarTrigger className='ml-1 ' />
          <div className='flex w-full justify-end mb-3'>
            <DialogComp />
          </div>
        </div>
        <SidebarInset>
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Home />} />
            </Routes>
          </BrowserRouter>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default App;
