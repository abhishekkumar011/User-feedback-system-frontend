import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

const SubmitForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
    category: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errors = [];

    if (formData.username.trim().length < 3) {
      errors.push("Username must be at least 3 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.push("Please enter a valid email");
    }

    if (formData.message.trim().length < 10) {
      errors.push("Feedback message must be at least 10 characters.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      setIsSubmitting(false);
      return;
    }

    const finalFormData = {
      ...formData,
      category: formData.category || "suggestion",
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalFormData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ username: "", email: "", message: "", category: "" });

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 my-5 px-3">
      <Button
        className="cursor-pointer"
        variant={"ghost"}
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      <form className="p-6 flex flex-col space-y-4 shadow-sm rounded-md border">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Submit Feedback</h1>
          <p className="text-gray-600">
            We value your input. Please fill out the form below to submit your
            feedback.
          </p>
        </div>

        <div className="space-y-4">
          <Label className="text-md" htmlFor="username">
            Name
          </Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-4">
          <Label className="text-md" htmlFor="email">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="category" className="text-md">
            Category
          </Label>
          <Select
            value={formData.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="suggestion">Suggestion</SelectItem>
              <SelectItem value="bug">Bug Report</SelectItem>
              <SelectItem value="feature">Feature Request</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label htmlFor="message" className="text-md">
            Feedback
          </Label>
          <Textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <Button disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>

        {success && (
          <p className="text-green-600">Feedback submitted successfully!</p>
        )}
      </form>
    </div>
  );
};

export default SubmitForm;
