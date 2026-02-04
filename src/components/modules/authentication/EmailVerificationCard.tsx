import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Inbox } from "lucide-react";

export default function EmailVerificationCard({
  emailSentTo,
  setEmailSentTo,
}: React.ComponentProps<typeof Card> & {
  emailSentTo: string;
  setEmailSentTo: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Card
      className={cn(
        "w-full max-w-md mx-auto overflow-hidden border-slate-200/60 dark:border-slate-800/60 shadow-2xl",
      )}
    >
      <div className="h-1.5 bg-linear-to-r from-green-500 to-emerald-600" />
      <CardHeader className="text-center pt-10 space-y-4">
        <div className="mx-auto bg-green-50 dark:bg-green-900/20 w-16 h-16 rounded-3xl flex items-center justify-center animate-bounce">
          <Inbox className="text-green-600 dark:text-green-400 w-8 h-8" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-black tracking-tight">
            Check your email
          </CardTitle>
          <CardDescription className="text-base">
            We've sent a verification link to <br />
            <span className="font-bold text-slate-900 dark:text-white underline decoration-blue-500/30 text-lg">
              {emailSentTo}
            </span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="text-center pb-8 space-y-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Click the link in the email to activate your account. If you don't see
          it, check your{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Spam folder
          </span>
          .
        </p>
        <div className="flex flex-col gap-3">
          <Button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all"
            asChild
          >
            <a
              href={`https://mail.google.com/mail/u/0/#search/from%3AMedi+Store+Please+verify+your+email`}
              target="_blank"
            >
              Open Gmail <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            className="text-blue-600 font-semibold"
            onClick={() => setEmailSentTo("")}
          >
            Enter a different email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
