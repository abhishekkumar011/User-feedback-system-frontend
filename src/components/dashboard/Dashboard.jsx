import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeedbackList } from "../../components";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto space-y-6 my-10 px-50">
      <Button
        className="cursor-pointer"
        variant={"ghost"}
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold">Feedback Dashboard</h1>
          <p className="text-gray-600 text-md">
            view and manage all submitted feedback.
          </p>
        </div>

        <Button
          onClick={() => navigate("/submit")}
          className="text-md cursor-pointer px-8 py-5"
        >
          Submit New Feedback
        </Button>
      </div>

      {/* Filter box  */}
      <div className="border border-gray-300 rounded-md p-5 space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">Filter and Sort</h1>
          <p className="text-gray-600">
            Narrow down feedback by category, or sort order
          </p>
        </div>

        <div className="flex gap-4 mb-4">
          <Select>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="suggestion">Suggestion</SelectItem>
              <SelectItem value="bug">Bug Report</SelectItem>
              <SelectItem value="feature">Feature Request</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Result */}
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold mb-5">Results</h1>
        <FeedbackList />
        <FeedbackList />
        <FeedbackList />
      </div>
    </div>
  );
};

export default Dashboard;
