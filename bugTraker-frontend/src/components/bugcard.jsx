import { useNavigate } from "react-router-dom";
import Statuscolor from "./statuscolor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function BugCard({ bug, removeBugs, onedit, onview }) {
  const navigate = useNavigate();

  const bgColor = {
    high: "bg-red-100 text-red-700 border-red-200",
    mid: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    
    <div
      onClick={() => navigate(`/bugs/${bug._id}`)}
      className="group rounded-2xl bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight">{bug.title}</h3>
          <p className="text-sm text-muted-foreground">
            Created {new Date(bug.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Statuscolor status={bug.status} />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Badge variant="outline" className="flex items-center gap-2 capitalize">
          <span
            className={`h-2 w-2 rounded-full ${
              bug.priority === "high"
                ? "bg-red-500"
                : bug.priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
          />
        {bug.priority}
        </Badge>
      </div>
      <div
  className="mt-6 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity"

        onClick={(e) => e.stopPropagation()}
      >
        <Button size="sm" variant="secondary" onClick={(e) => onedit(bug._id)}>
          Edit
        </Button>

        <Button size="sm" variant="default" onClick={() => onview(bug._id)}>
          Add a solution
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={(e) => removeBugs(bug._id)}
        >
          remove if finished
        </Button>
      </div>
    </div>
  );
}

export default BugCard;
