import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-8 px-3">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold ">User Feedback System</h1>
        <p className="text-gray-600">
          Collect, manage, and analyze user feedback to improve your product or
          service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
            <CardDescription>
              Share your thoughts, suggestions, or report issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              We value your input! Use our simple form to submit your feedback.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full cursor-pointer"
              onClick={() => navigate("/submit")}
            >
              Submit Feedback
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>View Feedback</CardTitle>
            <CardDescription>
              Browse through all submitted feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Access our dashboard to view all submitted feedback.</p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              View Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;
