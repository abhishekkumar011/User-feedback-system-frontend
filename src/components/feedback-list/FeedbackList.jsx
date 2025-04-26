import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeedbackList = ({ item }) => {
  const getBadgeStyle = (category) => {
    switch (category) {
      case "suggestion":
        return "bg-green-100 text-green-700";
      case "bug":
        return "bg-red-100 text-red-700";
      case "feature":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg">{item.username}</h3>
            <p className="text-gray-600">{item.email}</p>
          </div>

          <div className="">
            <Badge className={`capitalize ${getBadgeStyle(item.category)}`}>
              {item.category}
            </Badge>
          </div>
        </div>
        <p className="whitespace-pre-line">{item.message}</p>
      </CardContent>
    </Card>
  );
};

export default FeedbackList;
