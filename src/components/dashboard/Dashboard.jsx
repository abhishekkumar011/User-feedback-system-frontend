import React, { useEffect, useState } from "react";
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

  const [feedbacks, setFeedbacks] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_ENDPOINT);
        const data = await response.json();
        setFeedbacks(data.feedbacks || []);
      } catch (error) {
        console.error("Error fetching feedbacks: ", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks
    .filter((fb) => {
      return filterCategory && filterCategory !== "all"
        ? fb.category === filterCategory
        : true;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  return (
    <div className="mx-auto space-y-6 my-10 px-5 lg:px-50">
      <Button
        className="cursor-pointer"
        variant={"ghost"}
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold">Feedback Dashboard</h1>
          <p className="text-gray-600 text-md text-center md:text-left">
            view and manage all submitted feedback.
          </p>
        </div>

        <Button
          onClick={() => navigate("/submit")}
          className="text-md cursor-pointer px-8 py-5 w-full sm:w-fit"
        >
          Submit New Feedback
        </Button>
      </div>

      {/* Filter box  */}
      <div className="border border-gray-300 rounded-md p-5 space-y-5">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-semibold">Filter and Sort</h1>
          <p className="text-gray-600">
            Narrow down feedback by category, or sort order
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-1/2">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="suggestion">Suggestion</SelectItem>
              <SelectItem value="bug">Bug Report</SelectItem>
              <SelectItem value="feature">Feature Request</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-1/2">
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
        <h1 className="text-2xl font-semibold mb-5 text-center md:text-left">Results</h1>
        {feedbacks.length === 0 && (
          <p className="text-xl text-center">
            No Feedback to show, First you have to post feedback
          </p>
        )}
        {filteredFeedbacks.map((fb) => (
          <FeedbackList key={fb._id} item={fb} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
