"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateList = () => {
  const router = useRouter();
  const [createList, setCreateList] = useState(false);
  const [name, setName] = useState("");
  const [privacy, setPrivacy] = useState("");
  const handleCreateList = async () => {
    if (!name) return alert("Name is required");
    setCreateList(false);
    try {
      if(privacy==""){
        alert("Privacy is required");
        return;
      }
      if(name==""){
        alert("Name is required");
        return;
      }
      const response = await axios.post("/api/watchlist", { name, privacy });
      console.log(response.data);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };
  return(<>
  {!createList ?(
    <div
      className="flex items-center cursor-pointer"
      onClick={() => setCreateList(true)}
    >
      Create New
      <PlusCircleIcon className="w-4 h-4 ml-1" />
    </div>
  ) : (
    <div className="flex flex-col gap-y-1">
      <Input
        type="text"
        placeholder="List Name"
        className="w-full p-2 rounded-md bg-primary/10"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Select value={privacy} onValueChange={(value) => setPrivacy(value)} required>
        <SelectTrigger className=" bg-primary/10 w-full">
          <SelectValue placeholder="Privacy" />
        </SelectTrigger>
        <SelectContent className="bg-secondary">
          <SelectItem value="public">Public</SelectItem>
          <SelectItem
            value="private"
            onChange={(e: any) => setPrivacy(e.target.value)}
          >
            Private
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="flex justify-end">
        <Button variant="secondary" size="sm" onClick={handleCreateList}>
          Create
        </Button>
      </div>
    </div>
  )}
  </>
)
}
  
  
    
  


export default CreateList;
