"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { createReview } from "@/actions/review.action";

interface MedicineReviewModalProps {
  medicineId: string;
  medicineName: string;
}

export function MedicineReviewModal({
  medicineId,
  medicineName,
}: MedicineReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return toast.error("Please select a star rating");

    setIsSubmitting(true);
    try {
      const payload = {
        rating,
        comment,
        medicineId,
      };

      const result = await createReview(payload);

      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      setIsSuccess(true);
      toast.success("Review submitted! Thank you for your feedback.");

      setTimeout(() => {
        setOpen(false);
        setIsSuccess(false);
        setRating(0);
        setComment("");
      }, 2000);
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-blue-100 cursor-pointer"
        >
          Rate Medicine
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25 rounded-3xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-black flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            Review Medicine
          </DialogTitle>
          <p className="text-sm text-slate-500 font-medium">
            How was your experience with{" "}
            <span className="text-blue-600 font-bold">{medicineName}</span>?
          </p>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-10 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <p className="font-bold text-slate-900">
              Review Submitted Successfully!
            </p>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Star Rating System */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform active:scale-90"
                  >
                    <Star
                      className={`h-10 w-10 transition-colors ${
                        star <= (hover || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-tighter">
                {rating === 0
                  ? "Select your rating"
                  : `${rating} out of 5 stars`}
              </p>
            </div>

            {/* Comment Section */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">
                Your Comments
              </label>
              <Textarea
                placeholder="Write about the effectiveness, side effects, or delivery..."
                className="rounded-2xl border-slate-200 focus:ring-blue-500 focus:border-blue-500 min-h-30"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-100 cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
