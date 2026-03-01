import React from "react";
import BugCard from "../components/bugcard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Buglist({ buglist = [], removeBugs }) {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filterbugs = buglist.filter((item) => {
    const searchedinput = (item.title ?? "")
      .toLowerCase()
      .includes(input.toLowerCase());
    const filterbyselect = filter === "all" || item.status === filter;

    return searchedinput && filterbyselect;
  });

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8  ">
        <div>
          <h1 className="text-3xl font-bold tracking-sign">Bug Tracker</h1>
          <p className="text-muted-foreground">
            Manage and track reported issues
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="search bugs...."
            className="sm:max-w-sm"
          />
          <Select
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent> 
            <SelectItem value="all">Sort by : </SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
          </Select>
        </div>

          {filterbugs.length === 0? (
               <div className="flex flex-col items-center justify-center py-20 text-center border rounded-xl bg-background">
                <h3 className="text-lg font-semibold">No Bugs Found</h3>
                <p className="text-sm text-muted-foreground"></p>
               </div>
          ): 
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filterbugs.map((item) => (
            <BugCard
              key={item._id}
              bug={item}
              onview={(id) => navigate(`/bugs/${id}`)}
              onedit={(id) => navigate(`/edit-bug/${id}`)}
              removeBugs={removeBugs}
              
            />
          ))}
              </div>
        }
      </div>
    </div>
  );
}

export default Buglist;
