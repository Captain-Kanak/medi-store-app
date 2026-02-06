import { Star, User, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function MedicineReviews({
  reviews,
}: {
  reviews: any[] | undefined;
}) {
  const totalReviews = reviews?.length || 0;

  const averageRating =
    totalReviews > 0
      ? reviews?.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews
      : 0;

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews?.filter((r) => r.rating === star).length || 0,
  }));

  return (
    <div className="space-y-8 pt-10 border-t mt-10">
      <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
        <MessageSquare className="h-5 w-5 text-blue-500" />
        Customer Reviews ({totalReviews})
      </div>

      <div className="grid md:grid-cols-12 gap-10">
        {/* Left: Summary Stats */}
        <div className="md:col-span-4 space-y-6">
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-900 p-8 text-center border">
            <h3 className="text-5xl font-black text-slate-900 dark:text-white">
              {averageRating.toFixed(1)}
            </h3>
            <div className="flex justify-center my-2 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.round(averageRating) ? "fill-current" : ""}`}
                />
              ))}
            </div>
            <p className="text-sm text-slate-500 font-medium">Average Rating</p>
          </div>

          <div className="space-y-3">
            {distribution.map((item) => (
              <div key={item.star} className="flex items-center gap-4 text-sm">
                <span className="w-4 font-bold">{item.star}</span>
                <Star className="h-3 w-3 fill-slate-300 text-slate-300" />
                <Progress
                  value={
                    totalReviews > 0 ? (item.count / totalReviews) * 100 : 0
                  }
                  className="h-2 flex-1"
                />
                <span className="w-8 text-right text-slate-400">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-8 space-y-6">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl border bg-white dark:bg-slate-900/50 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        Customer
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < review.rating ? "fill-current" : ""}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl text-slate-400">
              <MessageSquare className="mb-2 opacity-20" size={40} />
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
