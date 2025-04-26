import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeedbackList = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg">Abhishek</h3>
            <p className="text-gray-600">abhishek@email.com</p>
          </div>

          <div className="">
            <Badge className="bg-green-100 text-green-700">Suggestions</Badge>
          </div>
        </div>
        <p className="whitespace-pre-line">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sunt
          iste saepe laboriosam libero. Asperiores dolorem aut et nisi? Eaque?
        </p>
      </CardContent>
    </Card>
  );
};

export default FeedbackList;
