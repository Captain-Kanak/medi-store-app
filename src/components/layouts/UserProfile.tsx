import ProfileDisplay from "./ProfileDisplay";
import { ShieldCheck, Calendar, Star } from "lucide-react";
import { getUserData } from "@/actions/user.action";
import { User } from "@/types";

export default async function UserProfile() {
  const { data, error } = await getUserData();

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error.message}</div>;
  }

  const user = data as User;

  return (
    <div className="space-y-6">
      {/* Interactive Profile Card & Edit Modal */}
      <ProfileDisplay user={user} />

      {/* Account Insights Section */}
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-4">
          <div className="p-2 rounded-2xl bg-white dark:bg-emerald-900/50 text-emerald-600 shadow-sm">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-emerald-600/70 tracking-widest">
              Status
            </p>
            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
              VERIFIED {user?.role}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 flex items-center gap-4">
          <div className="p-2 rounded-2xl bg-white dark:bg-blue-900/50 text-blue-600 shadow-sm">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-blue-600/70 tracking-widest">
              Joined
            </p>
            <p className="text-sm font-bold text-blue-700 dark:text-blue-400">
              {new Date(user?.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 flex items-center gap-4">
          <div className="p-2 rounded-2xl bg-white dark:bg-amber-900/50 text-amber-600 shadow-sm">
            <Star size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-amber-600/70 tracking-widest">
              Trust Score
            </p>
            <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
              High
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
