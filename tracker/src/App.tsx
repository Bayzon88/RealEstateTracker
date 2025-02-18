import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "./components/ui/button";

import "./App.css";

import Home from "./pages/Home";
import { InputData } from "./pages/InputData";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { DialogComp } from "./components/Dialog/DialogComp";

function App() {
  return (
    <SidebarProvider className='w-full'>
      <AppSidebar />
      <div className='flex flex-col p-2 w-full'>
        <div className='flex  w-full'>
          <SidebarTrigger className='ml-1 ' />
          <div className='flex   w-full justify-end mb-3'>
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
